import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import * as menuData from './menu.json';
import {
  MenuProduct,
  PineconeQueryResult,
  PineconeMatch,
} from './types/menu.types';

@Injectable()
export class MenuService {
  private pinecone: Pinecone;
  private openai: OpenAI;
  private index: any;

  constructor(private configService: ConfigService) {
    const pineconeApiKey = this.configService.get<string>('PINECONE_API_KEY');
    const openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
    const pineconeIndexName = this.configService.get<string>(
      'PINECONE_INDEX_NAME',
    );

    if (!pineconeApiKey || !openaiApiKey || !pineconeIndexName) {
      console.error('Variables de entorno faltantes:');
      console.error('PINECONE_API_KEY:', pineconeApiKey ? '✓' : '✗');
      console.error('OPENAI_API_KEY:', openaiApiKey ? '✓' : '✗');
      console.error('PINECONE_INDEX_NAME:', pineconeIndexName ? '✓' : '✗');
      throw new Error('Missing required environment variables');
    }

    this.pinecone = new Pinecone({
      apiKey: pineconeApiKey,
    });
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.index = this.pinecone.Index(pineconeIndexName);
  }

  async indexMenu(): Promise<string> {
    // Extraer productos del array 'default' que encontramos en el JSON
    let products: MenuProduct[];
    if (menuData && typeof menuData === 'object' && 'default' in menuData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      products = (menuData as any).default as MenuProduct[];
    } else {
      throw new Error(
        'No se encontró la estructura esperada con "default" en menu.json',
      );
    }

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No se encontraron productos válidos en menu.json');
    }

    console.log(`Indexando ${products.length} productos...`);

    for (const product of products) {
      try {
        const embedding = await this.getEmbedding(
          product.nombre + ' ' + product.descripcion + ' ' + product.categoria,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await this.index.upsert([
          {
            id: product.id.toString(),
            values: embedding,
            metadata: {
              nombre: product.nombre,
              descripcion: product.descripcion,
              categoria: product.categoria,
              tags: product.tags?.join(',') || '',
            },
          },
        ]);
        console.log(`✓ Producto indexado: ${product.nombre}`);
      } catch (error) {
        console.error(`Error indexando producto ${product.nombre}:`, error);
        throw error;
      }
    }
    return `${products.length} productos indexados en Pinecone`;
  }

  async getEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      dimensions: 1024, // 👈 Especificar 1024 dimensiones para que coincida con tu índice
    });
    return response.data[0].embedding;
  }

  async searchMenu(query: string): Promise<PineconeMatch['metadata'][]> {
    const queryEmbedding = await this.getEmbedding(query);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const results = (await this.index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    })) as PineconeQueryResult;
    return results.matches.map((match: PineconeMatch) => match.metadata);
  }
}
