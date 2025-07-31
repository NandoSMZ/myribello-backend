export interface MenuProduct {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  tags: string[];
}

export interface PineconeMatch {
  id: string;
  score: number;
  metadata: {
    nombre: string;
    descripcion: string;
    categoria: string;
    tags: string;
  };
}

export interface PineconeQueryResult {
  matches: PineconeMatch[];
}

export interface RecommendRequest {
  message: string;
}

export interface RecommendResponse {
  recomendacion: string | null;
}
