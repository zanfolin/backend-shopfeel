import bcrypt from 'bcrypt';

const moods = [
  ['Alegria / Otimismo', 'Amarelo', 'Energia, calor, luz, expansividade e positividade.'],
  ['Calma / Serenidade', 'Azul', 'Paz, tranquilidade, segurança e relaxamento.'],
  ['Raiva / Paixão', 'Vermelho', 'Intensidade, excitação, urgência, calor e força.'],
  ['Criatividade / Mistério', 'Roxo / Lilás', 'Espiritualidade, introspecção, magia, luxo e imaginação.'],
  ['Equilíbrio / Esperança', 'Verde', 'Renovação, saúde, conexão com a natureza e harmonia.'],
  ['Entusiasmo / Vitalidade', 'Laranja', 'Sociabilidade, diversão, estímulo, coragem e extroversão.'],
  ['Compaixão / Ternura', 'Rosa', 'Delicadeza, afeto, doçura, empatia e inocência.'],
  ['Tédio / Neutralidade', 'Cinza', 'Indiferença, monotonia, estabilidade e ausência de emoção forte.'],
  ['Luto / Poder', 'Preto', 'Tristeza profunda, elegância, sofisticação e mistério.'],
  ['Paz / Clareza', 'Branco', 'Pureza, calma, novos começos e clareza.']
];

export async function seed(knex) {
  await knex.transaction(async (trx) => {
    for (const [mood_name, associated_color, description] of moods) {
      await trx('moods').insert({ mood_name, associated_color, description })
        .onConflict('mood_name').merge({ associated_color, description });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD is required to run the seed');
    }

    const password = await bcrypt.hash(adminPassword, 12);
    await trx('customers').insert({
      name: 'Administrator',
      email: 'admin@admin.com',
      email_verified: 1,
      photo: null,
      password,
      access_level: 'ADMIN'
    }).onConflict('email').merge({
      name: 'Administrator',
      email_verified: 1,
      access_level: 'ADMIN'
    });
  });
}
