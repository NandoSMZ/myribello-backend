import { Controller, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { OpenAI } from 'openai';
import { RecommendRequest, RecommendResponse } from './types/menu.types';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly menuService: MenuService) {}

  // Endpoint para indexar (solo la primera vez o cuando actualices el menú)
  @Post('index')
  async indexMenu(): Promise<string> {
    return await this.menuService.indexMenu();
  }

  // Endpoint de recomendación
  @Post()
  async recommend(@Body() body: RecommendRequest): Promise<RecommendResponse> {
    // 1. Buscar productos relevantes en Pinecone
    const productos = await this.menuService.searchMenu(body.message);

    // 2. Construir el prompt para GPT
    const productosTexto = productos
      .map((p) => `- ${p.nombre}: ${p.descripcion}`)
      .join('\n');

    const prompt = `Eres un asistente de restaurante. El cliente dice: "${body.message}".

    Productos disponibles que coinciden:
    ${productosTexto}

    Instrucciones:
    - Recomienda SOLO 1 producto específico
    - Habla directamente al cliente
    - Sé conciso (máximo 2 oraciones)
    - Menciona 1-2 ingredientes clave que justifiquen tu recomendación
    - Usa un tono amigable y directo

    Respuesta:`;

    // 3. Llamar a OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
    });

    return { recomendacion: chat.choices[0]?.message?.content || null };
  }
}
