// Algerian food database — values per 100 g / 100 ml.
// Sources: Ciqual (ANSES) average values adapted to traditional Algerian recipes.
// serving.unit drives the localized portion label; liquid -> "ml" instead of "g".

const food = (
  id,
  category,
  fr,
  ar,
  en,
  emoji,
  kcal,
  protein,
  carbs,
  fat,
  servingGrams,
  servingUnit = 'portion',
  liquid = false,
) => ({
  id,
  category,
  emoji,
  names: { fr, ar, en },
  per100: { kcal, protein, carbs, fat },
  serving: { grams: servingGrams, unit: servingUnit },
  liquid,
})

export const CATEGORIES = [
  'plats',
  'soupes',
  'pains',
  'petitdej',
  'viandes',
  'legumes',
  'fruits',
  'laitiers',
  'sucreries',
  'boissons',
  'bases',
]

export const FOODS = [
  // ---------------------------------------------------------------- plats
  food('couscous-khodra', 'plats', 'Couscous aux légumes', 'كسكس بالخضر', 'Vegetable couscous', '🥘', 140, 4.5, 22, 3.6, 350, 'plate'),
  food('couscous-poulet', 'plats', 'Couscous au poulet', 'كسكس بالدجاج', 'Chicken couscous', '🍗', 158, 8.5, 20, 4.6, 350, 'plate'),
  food('couscous-agneau', 'plats', 'Couscous à l’agneau', 'كسكس باللحم', 'Lamb couscous', '🥩', 190, 9.5, 20, 8, 350, 'plate'),
  food('chakhchoukha', 'plats', 'Chakhchoukha', 'شخشوخة', 'Chakhchoukha', '🫓', 152, 5.5, 23, 3.8, 300, 'plate'),
  food('rechta', 'plats', 'Rechta algéroise', 'رشتة', 'Rechta noodles', '🍜', 155, 8, 21, 4, 350, 'plate'),
  food('trida', 'plats', 'Trida', 'تريدة', 'Trida', '🍲', 150, 7, 21, 4.2, 300, 'plate'),
  food('berkoukes', 'plats', 'Berkoukes', 'بركوكس', 'Berkoukes', '🥣', 128, 5, 20, 3, 300, 'plate'),
  food('dolma', 'plats', 'Dolma (légumes farcis)', 'دولمة', 'Dolma', '🍆', 142, 6.5, 14, 6.8, 250, 'plate'),
  food('tajine-zitoune', 'plats', 'Tajine zitoune', 'طاجين الزيتون', 'Chicken & olive tagine', '🫒', 138, 10, 8, 7.2, 250, 'plate'),
  food('tajine-hlou', 'plats', 'Tajine hlou', 'طاجين حلو', 'Sweet tagine', '🍑', 228, 11, 24, 10, 180, 'plate'),
  food('lham-lahlou', 'plats', 'Lham lahlou', 'لحم لحلو', 'Sweet lamb with raisins', '🍇', 248, 14, 24, 11, 180, 'plate'),
  food('chtitha-djedj', 'plats', 'Chtitha djedj', 'شطيطحة دجاج', 'Chicken chtitha', '🌶️', 132, 12, 5.5, 7, 250, 'plate'),
  food('mhajeb', 'plats', 'Mhajeb', 'محاجب', 'Mhadjeb', '🌯', 232, 5.5, 33, 8.2, 120, 'piece'),
  food('bourek', 'plats', 'Bourek', 'بوراك', 'Bourek', '🥟', 268, 8, 25, 14.5, 60, 'piece'),
  food('garantita', 'plats', 'Garantita', 'قرنطيطة', 'Karantika', '🧆', 172, 6.5, 19, 7.8, 200, 'portion'),
  food('kefta', 'plats', 'Kefta (boulettes)', 'كفتة', 'Kefta meatballs', '🍅', 205, 15, 5, 13.5, 150, 'portion'),
  food('loubia', 'plats', 'Loubia', 'لوبيا', 'White bean stew', '🫘', 112, 6, 15, 3.2, 250, 'bowl'),
  food('adess', 'plats', 'Adess (lentilles)', 'عدس', 'Lentil stew', '🥣', 108, 7, 16, 1.8, 250, 'bowl'),

  // --------------------------------------------------------------- soupes
  food('chorba-frik', 'soupes', 'Chorba frik', 'شوربة فريك', 'Freekeh chorba', '🥣', 62, 3.4, 8, 1.6, 300, 'bowl'),
  food('chorba-bida', 'soupes', 'Chorba bida', 'شوربة بيضاء', 'White chorba', '🥛', 68, 3, 9, 2.2, 300, 'bowl'),
  food('harira', 'soupes', 'Harira', 'حريرة', 'Harira', '🍲', 74, 4, 10.5, 2, 300, 'bowl'),

  // ---------------------------------------------------------------- pains
  food('khobz-dar', 'pains', 'Khobz ed dar', 'خبز الدار', 'Homemade flatbread', '🫓', 248, 8, 50, 2.4, 90, 'piece'),
  food('kesra', 'pains', 'Kesra', 'كسرة', 'Kesra semolina bread', '🌀', 258, 7, 52, 3, 90, 'piece'),
  food('matlou', 'pains', 'Matlou', 'مطلوع', 'Matlou bread', '🥖', 250, 8, 50, 2, 90, 'piece'),
  food('baguette', 'pains', 'Baguette', 'خبز فرنسي', 'Baguette', '🥖', 272, 9, 55, 1.5, 60, 'portion'),
  food('msemen', 'pains', 'Msemen', 'مسمن', 'Msemen', '🥞', 298, 6, 40, 12, 90, 'piece'),
  food('baghrir', 'pains', 'Baghrir', 'بغرير', 'Baghrir', '🍯', 218, 6, 42, 3.4, 80, 'piece'),
  food('pain-complet', 'pains', 'Pain complet', 'خبز كامل', 'Wholemeal bread', '🍞', 245, 10, 45, 3, 60, 'portion'),

  // ------------------------------------------------------------- petit-déj
  food('oeuf-bouilli', 'petitdej', 'Œuf bouilli', 'بيض مسلوق', 'Boiled egg', '🥚', 155, 13, 1.1, 11, 55, 'piece'),
  food('omelette', 'petitdej', 'Omelette', 'أومليت', 'Omelette', '🍳', 154, 10.6, 2, 11.5, 120, 'portion'),
  food('beurre', 'petitdej', 'Beurre', 'زبدة', 'Butter', '🧈', 717, 0.9, 0.1, 81, 10, 'spoon'),
  food('confiture', 'petitdej', 'Confiture', 'مربى', 'Jam', '🍓', 250, 0.4, 62, 0, 20, 'spoon'),
  food('miel', 'petitdej', 'Miel', 'عسل', 'Honey', '🍯', 304, 0.3, 82, 0, 20, 'spoon'),
  food('fromage', 'petitdej', 'Fromage (Edam)', 'جبن', 'Cheese (Edam)', '🧀', 330, 25, 1.5, 25, 30, 'portion'),
  food('jben', 'petitdej', 'Jben', 'جبن طازج', 'Fresh jben cheese', '🥛', 118, 12, 3, 6.4, 50, 'portion'),

  // --------------------------------------------------- viandes & poissons
  food('merguez', 'viandes', 'Merguez', 'مرقاز', 'Merguez sausage', '🌭', 288, 15, 2, 25, 60, 'piece'),
  food('poulet-roti', 'viandes', 'Poulet rôti', 'دجاج مشوي', 'Roast chicken', '🍗', 190, 27, 0, 9, 150, 'portion'),
  food('sardines', 'viandes', 'Sardines grillées', 'سردين مشوي', 'Grilled sardines', '🐟', 190, 22, 0, 11, 100, 'portion'),
  food('merlan', 'viandes', 'Merlan (poisson blanc)', 'سمك أبيض', 'White fish', '🐠', 95, 18, 0, 2.4, 150, 'portion'),
  food('thon', 'viandes', 'Thon à l’huile', 'تونة بالزيت', 'Tuna in oil', '🐟', 190, 25, 0, 10, 60, 'portion'),
  food('agneau-grille', 'viandes', 'Agneau grillé', 'لحم غنم مشوي', 'Grilled lamb', '🍖', 250, 25, 0, 16, 120, 'portion'),

  // -------------------------------------------------------------- légumes
  food('salade-algerienne', 'legumes', 'Salade algérienne', 'سلطة جزائرية', 'Algerian salad', '🥗', 55, 1.2, 6, 3, 150, 'bowl'),
  food('tomate', 'legumes', 'Tomate', 'طماطم', 'Tomato', '🍅', 18, 0.9, 3.9, 0.2, 100, 'piece'),
  food('concombre', 'legumes', 'Concombre', 'خيار', 'Cucumber', '🥒', 15, 0.7, 3.6, 0.1, 100, 'portion'),
  food('carotte', 'legumes', 'Carotte', 'جزر', 'Carrot', '🥕', 41, 0.9, 9.6, 0.2, 80, 'piece'),
  food('courgette-cuite', 'legumes', 'Courgette cuite', 'كوسة مطبوخة', 'Cooked zucchini', '🥒', 24, 1.2, 4.5, 0.3, 150, 'portion'),
  food('pomme-de-terre', 'legumes', 'Pomme de terre bouillie', 'بطاطا مسلوقة', 'Boiled potato', '🥔', 87, 2, 20, 0.1, 150, 'portion'),
  food('frites', 'legumes', 'Frites maison', 'بطاطا مقلية', 'Homemade fries', '🍟', 320, 3.4, 41, 15, 100, 'portion'),
  food('olives', 'legumes', 'Olives vertes', 'زيتون أخضر', 'Green olives', '🫒', 145, 1, 4, 15, 30, 'portion'),
  food('pois-chiches', 'legumes', 'Pois chiches cuits', 'حمص مطبوخ', 'Cooked chickpeas', '🫘', 164, 8.9, 27, 2.6, 150, 'portion'),

  // --------------------------------------------------------------- fruits
  food('orange', 'fruits', 'Orange', 'برتقال', 'Orange', '🍊', 47, 0.9, 11, 0.1, 150, 'piece'),
  food('pasteque', 'fruits', 'Pastèque', 'دلاع', 'Watermelon', '🍉', 30, 0.6, 7.6, 0.15, 250, 'slice'),
  food('raisin', 'fruits', 'Raisin', 'عنب', 'Grapes', '🍇', 69, 0.7, 18, 0.2, 100, 'portion'),
  food('figues', 'fruits', 'Figues fraîches', 'كرموس', 'Fresh figs', '🫐', 74, 0.75, 19, 0.3, 100, 'portion'),
  food('pomme', 'fruits', 'Pomme', 'تفاح', 'Apple', '🍎', 52, 0.3, 14, 0.2, 150, 'piece'),
  food('banane', 'fruits', 'Banane', 'بنان', 'Banana', '🍌', 89, 1.1, 23, 0.3, 120, 'piece'),
  food('dattes', 'fruits', 'Dattes Deglet Nour', 'دقلة نور', 'Deglet Nour dates', '🌴', 280, 2, 75, 0.4, 30, 'portion'),

  // ------------------------------------------------------------ laitiers
  food('lait-entier', 'laitiers', 'Lait entier', 'حليب كامل', 'Whole milk', '🥛', 62, 3.2, 4.7, 3.4, 200, 'glass', true),
  food('yaourt', 'laitiers', 'Yaourt nature', 'ياغورت طبيعي', 'Plain yogurt', '🥣', 61, 4, 5, 3, 125, 'piece'),
  food('lben', 'laitiers', 'Lben', 'لبن', 'Lben buttermilk', '🥛', 38, 3.4, 4.4, 0.9, 200, 'glass', true),
  food('raib', 'laitiers', 'Raib', 'رايب', 'Raib', '🥛', 58, 3.5, 7, 1.4, 200, 'glass', true),

  // ----------------------------------------------------------- sucreries
  food('kalb-el-louz', 'sucreries', 'Kalb el louz', 'قلب اللوز', 'Kalb el louz', '🍰', 350, 5, 50, 14, 70, 'piece'),
  food('baklawa', 'sucreries', 'Baklawa', 'بقلاوة', 'Baklava', '🥮', 400, 6, 48, 20, 40, 'piece'),
  food('zlabia', 'sucreries', 'Zlabia', 'زلابية', 'Zlabia', '🍩', 380, 3, 55, 17, 50, 'piece'),
  food('makroud', 'sucreries', 'Makroud', 'مقروض', 'Makroud', '🍯', 390, 4, 55, 17, 40, 'piece'),
  food('ghribia', 'sucreries', 'Ghribia', 'غريبة', 'Ghribia', '🍪', 430, 5, 60, 19, 35, 'piece'),

  // ------------------------------------------------------------ boissons
  food('the-menthe', 'boissons', 'Thé à la menthe sucré', 'أتاي بالنعناع', 'Sweet mint tea', '🍵', 42, 0, 10.5, 0, 200, 'glass', true),
  food('cafe-noir', 'boissons', 'Café noir', 'قهوة سوداء', 'Black coffee', '☕', 2, 0.1, 0.3, 0, 60, 'cup', true),
  food('cafe-lait', 'boissons', 'Café au lait', 'قهوة بالحليب', 'Coffee with milk', '☕', 52, 3, 5.5, 2, 150, 'cup', true),
  food('jus-orange', 'boissons', 'Jus d’orange frais', 'عصير برتقال', 'Fresh orange juice', '🧃', 45, 0.7, 10, 0.2, 200, 'glass', true),
  food('lait-fraise', 'boissons', 'Lait fraise', 'حليب فراولة', 'Strawberry milk', '🍓', 72, 2.8, 11.5, 1.6, 200, 'glass', true),
  food('soda', 'boissons', 'Soda', 'مشروب غازي', 'Soda', '🥤', 42, 0, 10.6, 0, 330, 'portion', true),
  food('eau', 'boissons', 'Eau', 'ماء', 'Water', '💧', 0, 0, 0, 0, 250, 'glass', true),

  // ---------------------------------------------------------- ingrédients
  food('huile-olive', 'bases', 'Huile d’olive', 'زيت الزيتون', 'Olive oil', '🫒', 884, 0, 0, 100, 10, 'spoon'),
  food('harissa', 'bases', 'Harissa', 'هريسة', 'Harissa', '🌶️', 130, 3, 12, 8, 10, 'spoon'),
  food('sucre', 'bases', 'Sucre', 'سكر', 'Sugar', '🧂', 400, 0, 100, 0, 8, 'spoon'),
]

export const FOODS_BY_ID = Object.fromEntries(FOODS.map((f) => [f.id, f]))
