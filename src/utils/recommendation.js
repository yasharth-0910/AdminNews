import * as tf from '@tensorflow/tfjs';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';

export const getRecommendations = async (userPreferences, articles) => {
  const model = await UniversalSentenceEncoder.load();
  const userEmbedding = await model.embed(userPreferences);
  
  const recommendations = await Promise.all(articles.map(async (article) => {
    const articleEmbedding = await model.embed(article.title + ' ' + article.description);
    const similarity = await tf.losses.cosineDistance(userEmbedding, articleEmbedding);
    return { article, similarity };
  }));

  recommendations.sort((a, b) => a.similarity - b.similarity);
  return recommendations;
};
