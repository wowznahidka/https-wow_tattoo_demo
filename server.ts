import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BookingRecord {
  id: string;
  bookingCode: string;
  createdAt: string;
  data: any;
}

const bookingsStore: BookingRecord[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API Endpoints ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', studio: 'NOIR & NEEDLE Tattoo Studio' });
  });

  // AI Tattoo Idea & Sketch Consultant
  app.post('/api/ai/tattoo-consultant', async (req: Request, res: Response) => {
    try {
      const { idea, placement, stylePreference, mood, size, language = 'uk' } = req.body;

      if (!idea) {
        return res.status(400).json({ error: 'Idea description is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        const prompt = `You are a world-renowned master tattoo artist and art consultant at 'NOIR & NEEDLE Studio'.
Analyze the following client tattoo request and generate an artistic design concept proposal.
Target output language: ${language === 'uk' ? 'Ukrainian (Українська)' : 'English'}.

Client inputs:
- Core Idea/Concept: ${idea}
- Desired Body Placement: ${placement || 'Not specified'}
- Style Preference: ${stylePreference || 'Open to artist suggestion'}
- Mood/Vibe: ${mood || 'Dark, meaningful, aesthetic'}
- Target Size: ${size || 'Medium (12-18cm)'}

Generate a comprehensive artistic breakdown in JSON format.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                conceptTitle: {
                  type: Type.STRING,
                  description: 'Evocative title for the tattoo artwork concept'
                },
                artisticDescription: {
                  type: Type.STRING,
                  description: 'Detailed description of the visual composition, textures, contrast, flow'
                },
                recommendedStyle: {
                  type: Type.STRING,
                  description: 'Best suited tattoo style (e.g., Dark Blackwork, Fine Line, Micro-Realism, Neo-Traditional, Irezumi)'
                },
                colorPalette: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Recommended ink shades (e.g. Carbon Black, Deep Crimson, Gold Ochre, Slate Gray)'
                },
                suggestedElements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Key visual motifs and symbolic elements to combine'
                },
                optimalPlacement: {
                  type: Type.STRING,
                  description: 'Best anatomical location and flow advice'
                },
                estimatedSessions: {
                  type: Type.STRING,
                  description: 'Estimated sessions and hours needed'
                },
                painLevelAdvice: {
                  type: Type.STRING,
                  description: 'Pain scale advice (1-10) and sensation expectation for this placement'
                },
                artistPromptGuidance: {
                  type: Type.STRING,
                  description: 'Exact instructions to tell your tattoo artist during sketch development'
                }
              },
              required: [
                'conceptTitle',
                'artisticDescription',
                'recommendedStyle',
                'colorPalette',
                'suggestedElements',
                'optimalPlacement',
                'estimatedSessions',
                'painLevelAdvice',
                'artistPromptGuidance'
              ]
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, source: 'gemini', data: parsed });
        }
      }

      // High-grade fallback if API key is not configured or offline
      const isUk = language === 'uk';
      const fallbackData = {
        conceptTitle: isUk
          ? `Авторська концепція: "${idea.slice(0, 30)}..."`
          : `Custom Artwork: "${idea.slice(0, 30)}..."`,
        artisticDescription: isUk
          ? `Динамічна багатошарова композиція, де головний мотив "${idea}" переплітається з сакральною геометрією, глибокими чорними масивами та мікроточковою штриховкою (dotwork) для створення виразного 3D-об’єму на шкірі.`
          : `Dynamic layered composition where the focal motif "${idea}" seamlessly integrates with sacred geometric lines, rich carbon blackwork masses, and fine stippling gradients to sculpt depth against the skin.`,
        recommendedStyle: stylePreference || (isUk ? 'Dark Blackwork & Fine Line' : 'Dark Blackwork & Fine Line'),
        colorPalette: isUk
          ? ['Вугільно-чорний (Dynamic Black)', 'Графітовий сірий', 'Білі бліки для контрасту']
          : ['Carbon Pitch Black', 'Slate Graphite Gray', 'Pure White Accent Highlights'],
        suggestedElements: [
          idea,
          isUk ? 'Анатомічні направляючі лінії' : 'Anatomical Flow Linework',
          isUk ? 'Текстурні тіні та зернистий градієнт' : 'Textured Grain & Stipple Gradients',
          isUk ? 'Геометричний акцентний контур' : 'Geometric Framing Accents'
        ],
        optimalPlacement: placement || (isUk ? 'Передпліччя або Зовнішнє плече' : 'Forearm or Outer Deltoid'),
        estimatedSessions: isUk ? '1-2 сеанси (близько 4-6 годин)' : '1-2 sessions (approx 4-6 hours)',
        painLevelAdvice: isUk
          ? 'Помірний рівень (3-5/10). Рекомендуємо комфортно поснідати та пити воду під час роботи.'
          : 'Moderate sensation (3-5/10). Maintain hydration and enjoy a carb-rich meal prior to ink session.',
        artistPromptGuidance: isUk
          ? `Зверніть увагу майстра на плавний перехід світлотіні та чіткість тонких контурів навколо головного смислового елементу "${idea}".`
          : `Guide your artist to focus on seamless stipple gradients and crisp negative space framing around "${idea}".`
      };

      return res.json({ success: true, source: 'curated_studio_engine', data: fallbackData });
    } catch (err: any) {
      console.error('Error in /api/ai/tattoo-consultant:', err);
      res.status(500).json({
        error: 'Failed to generate tattoo concept',
        details: err?.message || 'Unknown error'
      });
    }
  });

  // Calculate Price & Sessions
  app.post('/api/calculate-price', (req: Request, res: Response) => {
    try {
      const { sizeCm = 15, style = 'blackwork', complexity = 'medium', color = 'black', placement = 'forearm' } = req.body;

      // Base formula
      let baseRate = 1800; // Base start price UAH
      let cmRate = sizeCm * 120;

      // Multipliers
      let styleMult = 1.0;
      if (style === 'microrealism' || style === 'japanese') styleMult = 1.35;
      if (style === 'coverup') styleMult = 1.45;
      if (style === 'fineline') styleMult = 1.1;

      let complexityMult = 1.0;
      if (complexity === 'simple') complexityMult = 0.85;
      if (complexity === 'detailed') complexityMult = 1.3;
      if (complexity === 'hyperrealism') complexityMult = 1.6;

      let colorMult = 1.0;
      if (color === 'accent') colorMult = 1.15;
      if (color === 'full') colorMult = 1.35;

      const totalUah = Math.round((baseRate + cmRate) * styleMult * complexityMult * colorMult);
      const hoursEstimated = Math.max(1.5, Math.round((sizeCm / 4.5) * complexityMult * 10) / 10);
      const sessions = hoursEstimated > 6 ? Math.ceil(hoursEstimated / 5) : 1;

      res.json({
        priceUah: totalUah,
        priceUsd: Math.round(totalUah / 41.5),
        estimatedHours: hoursEstimated,
        estimatedSessions: sessions,
        currency: 'UAH'
      });
    } catch (err) {
      res.status(500).json({ error: 'Calculation failed' });
    }
  });

  // Submit Booking
  app.post('/api/bookings', (req: Request, res: Response) => {
    try {
      const bookingData = req.body;
      const code = `NN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const record: BookingRecord = {
        id: `bk_${Date.now()}`,
        bookingCode: code,
        createdAt: new Date().toISOString(),
        data: bookingData
      };

      bookingsStore.unshift(record);

      res.json({
        success: true,
        bookingCode: code,
        message: 'Ваш запис успішно зареєстровано! Майстер зв’яжеться з вами протягом 2 годин.',
        record
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to record booking' });
    }
  });

  // Get Bookings (Admin/Staff view)
  app.get('/api/bookings', (req: Request, res: Response) => {
    res.json({ total: bookingsStore.length, bookings: bookingsStore.slice(0, 50) });
  });

  // --- Vite / Static Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOIR & NEEDLE Tattoo Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
