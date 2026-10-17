const productAssets = [
  ['gobelets', 'gobelets.jpg', 'Gobelets à jus', 'Accessoires', 5],
  ['kremy-chocolat-noisette', 'kremy-noisette.jpg', 'Crème à tartiner chocolat-noisette', 'Épicerie fine', 22],
  ['kremy-blanc-noisette-crunchy', 'Kremy Chocolat blanc Noisette Crunchy.jpg', 'Crème chocolat blanc-noisette crunchy', 'Épicerie fine', 22],
  ['kremy-chocolat-blanc', 'Kremy Chocolat Blanc.jpg', 'Crème à tartiner chocolat blanc', 'Épicerie fine', 22],
  
  // Crèmes à tartiner nouvelles
  ['creme-tartiner-chocolat-blanc', 'creme a tartiner chocolat blanc.jpg', 'Crème à tartiner chocolat blanc', 'Épicerie fine', 22],
  ['creme-tartiner-rochero', 'creme a tartiner rochero.jpg', 'Crème à tartiner Rochero', 'Épicerie fine', 22],
  ['creme-tartiner-bennos', 'créme a tartiner bennos.jpg', 'Crème à tartiner Bennos', 'Épicerie fine', 22],
  ['creme-tartiner-oreo', 'créme a tartiner oreo.jpg', 'Crème à tartiner Oreo', 'Épicerie fine', 25],
  ['creme-tartiner-speculoos', 'créme a tartiner spéculoos.jpg', 'Crème à tartiner Spéculoos', 'Épicerie fine', 22],
  
  // Sirops
  ['sirop-banane', 'sirop banane.jpg', 'Sirop Saveurs banane', 'Sirops', 15],
  ['sirop-caramel', 'sirop caramel.jpg', 'Sirop Saveurs caramel', 'Sirops', 15],
  ['sirop-citron-vert', 'sirop citron vert.jpg', 'Sirop Saveurs citron vert', 'Sirops', 15],
  ['sirop-mangue', 'sirop manque.jpg', 'Sirop Saveurs mangue', 'Sirops', 15],
  ['sirop-melon', 'sirop melon.jpg', 'Sirop Saveurs melon', 'Sirops', 15],
  ['sirop-noisette', 'Sirop Noisette.jpg', 'Sirop Saveurs noisette', 'Sirops', 15],
  ['sirop-pasteque', 'SIROP PASTEQUE.jpg', 'Sirop Saveurs pastèque', 'Sirops', 15],
  ['sirop-peche', 'sirop peche.jpg', 'Sirop Saveurs pêche', 'Sirops', 15],
  
  // Bases boissons & smoothies
  ['base-frappe-cafe', 'smoothie base frappé.jpg', 'Base frappé goût café', 'Bases boissons', 35],
  ['base-smoothie-neutre', 'smoothie base neutre.jpg', 'Base smoothie neutre', 'Bases boissons', 30],
  ['creme-pistache', 'Smoothie base PISTACHIO.jpg', 'Crème à tartiner pistache', 'Épicerie fine', 28],
  
  // Verrerie et tasses
  ['tasses-the', 'Tasses.jpg', 'Tasses à thé Brasiliano', 'Verrerie et tasses', 18],
  ['premium-drinking-mug', 'big house premium drinking mug.jpg', 'Big House Premium Drinking Mug', 'Verrerie et tasses', 45],
  ['cup-small', 'cup small.jpg', 'Petite tasse', 'Verrerie et tasses', 15],
  ['cup', 'cup.jpg', 'Tasse', 'Verrerie et tasses', 25],
  ['verre-the-ohio', 'glaass the ohio.jpg', 'Verre à thé Ohio', 'Verrerie et tasses', 11],
  ['verre-antalya', 'glass antalya.jpg', 'Verre Antalya', 'Verrerie et tasses', 12],
  ['verre-casual', 'glass casual.jpg', 'Verre Casual', 'Verrerie et tasses', 18],
  ['mug-the-eduador', 'glass eduador tea mug.jpg', 'Mug à thé Eduador', 'Verrerie et tasses', 14],
  ['boite-verre-conservation', 'glass food storage.jpg', 'Boîte de conservation en verre', 'Verrerie et tasses', 35],
  ['verre-glint-lines', 'glass glint lines.jpg', 'Verre Glint Lines', 'Verrerie et tasses', 12],
  ['verre-in-love', 'glass in love.jpg', 'Verre In Love', 'Verrerie et tasses', 13],
  ['verre-luminarc-martigues', 'glass luminarc martigues.jpg', 'Verre Luminarc Martigues', 'Verrerie et tasses', 16],
  ['verre-maghrebin', 'glass maghrebin.jpg', 'Verre Maghrébin', 'Verrerie et tasses', 13],
  ['verre-norvege', 'glass norvége.jpg', 'Verre Norvège', 'Verrerie et tasses', 10],
  ['verre-ribello-lines', 'glass ribrllo lines.jpg', 'Verre Ribello Lines', 'Verrerie et tasses', 12],
  ['verre-ruya', 'glass ruya.jpg', 'Verre Ruya', 'Verrerie et tasses', 9],
  ['verre-sicilly', 'glass sicilly.jpg', 'Verre Sicilly', 'Verrerie et tasses', 16],
  ['verre-tumblers-ribbed', 'glass tumblers ribbed.jpg', 'Verres Tumblers Ribbed', 'Verrerie et tasses', 17],
  ['verre-tumblers', 'glass tumblers.jpg', 'Verres Tumblers', 'Verrerie et tasses', 13],
  ['verre-venezia', 'glass venezia.jpg', 'Verre Venezia', 'Verrerie et tasses', 12],
  ['verre-zaru-coffee', 'glass zaru coffee.jpg', 'Verre Zaru Coffee', 'Verrerie et tasses', 7],
  ['assiette-white-moon', 'plate white moon.jpg', 'Assiette White Moon', 'Verrerie et tasses', 22],
  
  // Cafés
  ['cafe-dor-moulu-pur', 'cafe dor moulu pur.jpg', "Café d'Or moulu pur", 'Cafés', 4.5],
  ['cafe-premium-uganda', 'cafe premium uganda.jpg', 'Café premium Uganda', 'Cafés', 38],
  ['cafe-premium-vietnam', 'cafe premium vietnam.jpg', 'Café premium Vietnam', 'Cafés', 38],
  ['caffe-dor-expresso', 'caffe_dor_expresso.jpg', "Caffè d'Or espresso", 'Cafés', 34.5],
  ['cafe-dor-moulu-pur-selection', "café d'or moulu pur.jpg", "Café d'Or moulu pur, sélection", 'Cafés', 8.5],
  
  // Chichas
  ['chicha-bleue', 'chichableue.jpg', 'Chicha bleue', 'Chichas', 125],
  ['chicha-gold', 'chichagold.jpg', 'Chicha Gold', 'Chichas', 125],
  ['chicha-purple', 'chichapurple.jpg', 'Chicha Purple', 'Chichas', 125],
  ['chicha-red', 'chichared.jpg', 'Chicha Red', 'Chichas', 125],
  
  // Crèmes et garnitures
  ['creme-caramel', 'creme caramel.jpg', 'Crème caramel', 'Crèmes et garnitures', 9],
  ['creme-chantilly', 'creme chantilly.jpg', 'Crème chantilly', 'Crèmes et garnitures', 9],
  ['creme-chocolat', 'creme chocolat.jpg', 'Crème chocolat', 'Crèmes et garnitures', 9],
  ['creme-dokrem-fropping', 'creme dokrem fropping.jpg', 'Crème Dokrem Fropping', 'Crèmes et garnitures', 9],
  ['creme-fraise', 'creme fraise.jpg', 'Crème fraise', 'Crèmes et garnitures', 9],
  ['creme-framboise', 'creme framboise.jpg', 'Crème framboise', 'Crèmes et garnitures', 9],
  ['creme-noisette', 'creme noisette.jpg', 'Crème noisette', 'Crèmes et garnitures', 9],
  ['creme-kremy-chantilly', 'kremy creme chantitty.jpg', 'Crème Kremy chantilly', 'Crèmes et garnitures', 9],
  
  // Préparations Dokrem
  ['dokrem-caramel', 'dokrem caramel.jpg', 'Dokrem caramel', 'Préparations Dokrem', 13],
  ['dokrem-vanille', 'dokren vanille.jpg', 'Dokrem vanille', 'Préparations Dokrem', 13],
  
  // Fremigel
  ['fremigel-banane', 'fremigel banane.jpg', 'Fremigel banane', 'Fremigel', 13],
  ['fremigel-blue-curacao', 'fremigel blue curacao.jpg', 'Fremigel blue curaçao', 'Fremigel', 13],
  ['fremigel-caramel', 'fremigel caramel.jpg', 'Fremigel caramel', 'Fremigel', 13],
  ['fremigel-chocolat-chaud', 'fremigel chaucolat chaud.jpg', 'Fremigel chocolat chaud', 'Fremigel', 13],
  ['fremigel-fraise', 'fremigel fraise.jpg', 'Fremigel fraise', 'Fremigel', 13],
  ['fremigel-mangue', 'fremigel manque.jpg', 'Fremigel mangue', 'Fremigel', 13],
  ['fremigel-mojito', 'fremigel mojito.jpg', 'Fremigel mojito', 'Fremigel', 13],
  ['fremigel-noisette', 'fremigel noisette.jpg', 'Fremigel noisette', 'Fremigel', 13],
  ['fremigel-pasteque', 'fremigel pastéque.jpg', 'Fremigel pastèque', 'Fremigel', 13],
  ['fremigel-peche', 'fremigel peche.jpg', 'Fremigel pêche', 'Fremigel', 13],
  ['fremigel-pinacolada', 'fremigel pinacolada.jpg', 'Fremigel piña colada', 'Fremigel', 13],
  ['fremigel-roseberry', 'fremigel roseberry.jpg', 'Fremigel roseberry', 'Fremigel', 13],
  ['fremigel-vanille', 'fremigel vanille.jpg', 'Fremigel vanille', 'Fremigel', 13],
  
  // Fropping et toppings
  ['fropping-caramel', 'fropping caramel.jpg', 'Fropping caramel', 'Fropping et toppings', 9],
  ['fropping-chocolat-noir', 'fropping chocolat noir.jpg', 'Fropping chocolat noir', 'Fropping et toppings', 9],
  ['fropping-fraise', 'fropping fraise.jpg', 'Fropping fraise', 'Fropping et toppings', 9],
  ['fropping-framboise', 'fropping framboise.jpg', 'Fropping framboise', 'Fropping et toppings', 9],
  ['fropping-kiwi', 'fropping kiwi.jpg', 'Fropping kiwi', 'Fropping et toppings', 9],
  ['fropping-noisette', 'fropping noisette.jpg', 'Fropping noisette', 'Fropping et toppings', 9],
  ['fropping-vanille', 'fropping vanille.jpg', 'Fropping vanille', 'Fropping et toppings', 9],
  
  // Fructa
  ['fructa-banane', 'fructa banane.jpg', 'Fructa banane', 'Fructa', 30],
  ['fructa-cerise', 'fructa cherry.jpg', 'Fructa cerise', 'Fructa', 30],
  ['fructa-kiwi', 'fructa kiwi.jpg', 'Fructa kiwi', 'Fructa', 30],
  ['fructa-mangue', 'fructa manque.jpg', 'Fructa mangue', 'Fructa', 30],
  ['fructa-peche', 'fructa peach.jpg', 'Fructa pêche', 'Fructa', 30],
  ['fructa-pomme', 'fructa pomme.jpg', 'Fructa pomme', 'Fructa', 30],
  ['fructa-douceur-de-fruits', 'fructaa douceur de fruits.jpg', 'Fructa douceur de fruits', 'Fructa', 35],
  
  // Sauces et nappages
  ['sauce-caramel', 'sauce caramel.jpg', 'Sauce caramel', 'Sauces et nappages', 60],
  
  // Saveurs
  ['saveurs-ananas', 'saveurs ananas.jpg', 'Saveurs ananas', 'Saveurs', 35],
  ['saveurs-ananas-selection', 'saveurs ananass.jpg', 'Saveurs ananas, sélection', 'Saveurs', 35],
  ['saveurs-banane', 'saveurs banane.jpg', 'Saveurs banane', 'Saveurs', 35],
  ['saveurs-cerise', 'saveurs cerise.jpg', 'Saveurs cerise', 'Saveurs', 35],
  ['saveurs-chocolat-chaud', 'saveurs chocolat chaud.jpg', 'Saveurs chocolat chaud', 'Saveurs', 35],
  ['saveurs-framboise', 'saveurs framboise.jpg', 'Saveurs framboise', 'Saveurs', 35],
  ['saveurs-fruit-passion', 'saveurs fruit de la passion.jpg', 'Saveurs fruit de la passion', 'Saveurs', 35],
  ['saveurs-kiwi', 'saveurs kiwi.jpg', 'Saveurs kiwi', 'Saveurs', 35],
  ['saveurs-litchi', 'saveurs litchi.jpg', 'Saveurs litchi', 'Saveurs', 35],
  ['saveurs-noix-coco', 'saveurs Noix de coco.jpg', 'Saveurs noix de coco', 'Saveurs', 35],
  ['saveurs-peche', 'saveurs péche.jpg', 'Saveurs pêche', 'Saveurs', 35],
  ['saveurs-pomme-verte', 'saveurs pomme verte.jpg', 'Saveurs pomme verte', 'Saveurs', 35],
  
  // Épicerie
  ['lait-concentre-sucre', 'lait concentré succré.jpg', 'Lait concentré sucré', 'Épicerie', 8.8],
  ['melange-lait-concentre', 'mélange de lait concentré.jpg', 'Mélange de lait concentré', 'Épicerie', 8.8],
  ['lait-concentre-sucre-sweetened', 'sweetened condensed milk.jpg', 'Sweetened Condensed Milk', 'Épicerie', 8.8],
  ['eau-de-fleur', 'eau de fleur.jpg', "Eau de fleur d'oranger", 'Épicerie', 3.5],
  ['orlena-original', 'orlena original.jpg', 'Orlena Original', 'Épicerie', 18],
  ['saveur-du-matin', 'saveur du matin.jpg', 'Saveur du matin', 'Épicerie', 12],
  
  // Al Kanaa
  ['al-kanaa-banane', 'al kanaa banane.jpg', 'Al Kanaa Banane', 'Boissons', 4.5],
  ['al-kanaa-menthe', 'al kanaa menthe.jpg', 'Al Kanaa Menthe', 'Boissons', 4.5],
  ['al-kanaa-pistachio', 'al kanaa pistachio.jpg', 'Al Kanaa Pistachio', 'Boissons', 4.5],
  ['el-kanaa-amande', 'el kanaa amande.jpg', 'El Kanaa Amande', 'Boissons', 4.5],
  
  // Luxado - Cosmétiques et soins
  ['luxado-barouk', 'luxado barouk.jpg', 'Luxado Barouk', 'Cosmétiques', 4.5],
  ['luxado-black', 'luxado black.jpg', 'Luxado Black', 'Cosmétiques', 4.5],
  ['luxado-cire-epilation', 'luxado cire epilation.jpg', 'Luxado Cire épilation', 'Cosmétiques', 7],
  ['luxado-cire-epilation-vera', 'luxado cire epiltion vera.jpg', 'Luxado Cire épilation Vera', 'Cosmétiques', 4.5],
  ['luxado-eau-parfum', 'luxado eau de parfum.jpg', 'Luxado Eau de parfum', 'Cosmétiques', 9],
  ['luxado-gel-coiffant', 'luxado gel coiffant.jpg', 'Luxado Gel coiffant', 'Cosmétiques', 3.5],
  ['luxado-hair-wax', 'luxado hair wax.jpg', 'Luxado Hair Wax', 'Cosmétiques', 3.5],
  ['luxado-homme', 'luxado homme.jpg', 'Luxado Homme', 'Cosmétiques', 15],
  ['luxado-masque-argile-verte', 'luxado masque argile verte.jpg', 'Luxado Masque argile verte', 'Cosmétiques', 4.5],
  ['luxado-miel-cire-epilation', 'luxado miel cire epilation.jpg', 'Luxado Miel Cire épilation', 'Cosmétiques', 7],
  ['luxado-miel-hydratante', 'luxado miel hydrtante.jpg', 'Luxado Miel Hydratante', 'Cosmétiques', 4.5],
  ['luxado-nourishing-jelly', 'luxado nourishing jelly.jpg', 'Luxado Nourishing Jelly', 'Cosmétiques', 3.5],
  ['luxado-petroleum-jelly', 'luxado petroleum jelly.jpg', 'Luxado Petroleum Jelly', 'Cosmétiques', 3.5],
  ['luxado-petroleum-jelly-2', 'luxado petroleum jelly 2.jpg', 'Luxado Petroleum Jelly', 'Cosmétiques', 3.5],
  ['luxado-rose-cire-epilation', 'luxado rose cire epilation.jpg', 'Luxado Rose Cire épilation', 'Cosmétiques', 7],
  ['luxado-rose', 'luxado rose.jpg', 'Luxado Rose', 'Cosmétiques', 4.5],
  
  // Lilas - Hygiène et soins personnels
  ['lilas-brosse-dents', 'lilas-brosse-a-dents-2300.jpg', 'Lilas Brosse à dents', 'Hygiène', 2.3],
  ['lilas-dentifrice', 'lilas-dentifrice-2800.jpg', 'Lilas Dentifrice', 'Hygiène', 2.8],
  ['lilas-deodorant-extreme-exotique', 'lilas-dudorant-extreme-exotique-6500.jpg', 'Lilas Déodorant Extreme Exotique', 'Hygiène', 6.5],
  ['lilas-deodorant-extreme-fruite', 'lilas-dudorant-extreme-fruite-6500.jpg', 'Lilas Déodorant Extreme Fruité', 'Hygiène', 6.5],
  ['lilas-deodorant-extreme-vanille', 'lilas-dudorant-extreme-vanille-6500.jpg', 'Lilas Déodorant Extreme Vanille', 'Hygiène', 6.5],
  ['lilas-deodorant-supreme', 'lilas-dudorant-supreme-6500.jpg', 'Lilas Déodorant Supreme', 'Hygiène', 6.5],
  ['lilas-gel-lavant-bergamote', 'lilas-gellavant-bergamote-3500.jpg', 'Lilas Gel lavant Bergamote', 'Hygiène', 3.5],
  ['lilas-gel-lavant-citron', 'lilas-gellavant-citron-3500.jpg', 'Lilas Gel lavant Citron', 'Hygiène', 3.5],
  ['lilas-gel-lavant-fruite', 'lilas-gellavant-fruite-3500.jpg', 'Lilas Gel lavant Fruité', 'Hygiène', 3.5],
  ['lilas-gel-lavant-marine', 'lilas-gellavant-marine-3500.jpg', 'Lilas Gel lavant Marine', 'Hygiène', 3.5],
  ['lilas-lingette-bebe', 'lilas-lingette-bebe-5800.jpg', 'Lilas Lingette bébé', 'Hygiène', 5.8],
  ['lilas-lingette-blue', 'lilas-lingette-blue-1500.jpg', 'Lilas Lingette Blue', 'Hygiène', 1.5],
  ['lilas-lingette-grey', 'lilas-lingette-grey-1500.jpg', 'Lilas Lingette Grey', 'Hygiène', 1.5],
  ['lilas-lingette-yellow', 'lilas-lingette-yellow-1500.jpg', 'Lilas Lingette Yellow', 'Hygiène', 1.5],
  ['lilas-nett-blue', 'lilas-nett-blue-2800.jpg', 'Lilas Nett Blue', 'Hygiène', 2.8],
  ['lilas-nett-green', 'lilas-nett-green-2800.jpg', 'Lilas Nett Green', 'Hygiène', 2.8],
  ['lilas-nett-pink', 'lilas-nett-pink-2800.jpg', 'Lilas Nett Pink', 'Hygiène', 2.8],
  ['lilas-nett-white', 'lilas-nett-white-2800.jpg', 'Lilas Nett White', 'Hygiène', 2.8],
  ['lilas-papier-fleurie', 'lilas-papier-fleurie-4500.jpg', 'Lilas Papier Fleurie', 'Hygiène', 4.5],
  ['lilas-papillon', 'lilas-papillon-3700.jpg', 'Lilas Papillon', 'Hygiène', 3.7],
  ['lilas-protect-14p', 'lilas-protect-14p-28500.jpg', 'Lilas Protect 14p', 'Hygiène', 28.5],
  ['lilas-protect-large', 'lilas-protect-large-28500.jpg', 'Lilas Protect Large', 'Hygiène', 28.5],
  
  // Dumax - Parfums d'ambiance
  ['dumax-bergamote-small', 'dumax-berganote-small-3500.jpg', 'Dumax Bergamote Small', 'Parfums ambiance', 3.5],
  ['dumax-big-miel', 'dumax-big-miel.jpg', 'Dumax Big Miel', 'Parfums ambiance', 4.5],
  ['dumax-cypres-small', 'dumax-cypres-small-3500.jpg', 'Dumax Cyprès Small', 'Parfums ambiance', 3.5],
  ['dumax-fraicheur-big', 'dumax-fraicheur-big-4500.jpg', 'Dumax Fraîcheur Big', 'Parfums ambiance', 4.5],
  ['dumax-violette-small', 'dumax-small-violette-3500.jpg', 'Dumax Violette Small', 'Parfums ambiance', 3.5],
  
  // Aura Fraîcheur - Parfums d'ambiance
  ['aura-fraicheur-blue', 'aura-fraicheur-blue-6500.jpg', 'Aura Fraîcheur Blue', 'Parfums ambiance', 6.5],
  ['aura-fraicheur-rose', 'aura-fraicheur-rose-6500.jpg', 'Aura Fraîcheur Rose', 'Parfums ambiance', 6.5],
  ['aura-fraicheur-vert', 'aura-fraicheur-vert-6500.jpg', 'Aura Fraîcheur Vert', 'Parfums ambiance', 6.5],
  
  // Papier hygiénique
  ['elegant-papier', 'elegant-papier-1500.jpg', 'Elegant Papier', 'Hygiène', 1.5],
  ['faracha-papier', 'faracha-papier-1500.jpg', 'Faracha Papier', 'Hygiène', 1.5],
  ['joker-papier', 'joker-papier-1500.jpg', 'Joker Papier', 'Hygiène', 1.5],
  ['ultradoux-papier-narcisse', 'ultradoux-papier-narcisse-3300.jpg', 'Ultradoux Papier Narcisse', 'Hygiène', 3.3],
  
  // Incoped - Protections féminines
  ['incoped-green-10p', 'incoped-green-10p-14500.jpg', 'Incoped Green 10p', 'Hygiène', 14.5],
  ['incoped-pant-blue', 'incoped-pant-blue-18500.jpg', 'Incoped Pant Blue', 'Hygiène', 18.5],
  ['incoped-pant-green', 'incoped-pant-green-18500.jpg', 'Incoped Pant Green', 'Hygiène', 18.5],
  ['incoped-pant-purple', 'incoped-pant-purple-18500.jpg', 'Incoped Pant Purple', 'Hygiène', 18.5],
  
  // Kotis
  ['kotis-baby-lingette', 'kotis-baby-lingette-4500.jpg', 'Kotis Baby Lingette', 'Hygiène', 4.5],
  
  // Jbad - Tabliers & accessoires
  ['jbad-7mar-bro', 'jbad 7mar bro.jpg', 'Tablier rouge professionnel', 'Accessoires professionnels', 8],
  ['jbad-a5thar', 'jbad a5thar.jpg', 'Tablier vert', 'Accessoires professionnels', 10],
  ['jbad-bouni-bro', 'jbad bouni bro.jpg', 'Tablier marron professionnel', 'Accessoires professionnels', 10],
  ['jbad-bouni-pro', 'jbad bouni pro.jpg', 'Tablier marron pro', 'Accessoires professionnels', 12],
  ['jbad-plastique', 'jbad plastique.jpg', 'Tablier plastique', 'Accessoires professionnels', 3.5],
  ['jbad-silver', 'jbad silver.jpg', 'Tablier argenté', 'Accessoires professionnels', 8],
  
  // Accessoires chicha
  ['shisha-mouthpieces', 'shisha mouthpieces.jpg', 'Embouts chicha', 'Accessoires', 5],
  ['mouth-tips', 'mouth tips.jpg', 'Embouts bouche', 'Accessoires', 5],
  ['metal', 'metal.jpg', 'Accessoires métalliques', 'Accessoires', 8],
  
  // Packaging
  ['pizza-box-grand', 'pizza_box_grand.jpg', 'Grande boîte à pizza', 'Emballages', 14.5],
  ['mini-box-pizza', 'mini mox pizza.jpg', 'Mini boîte à pizza', 'Emballages', 13],
  ['papier-cuisson', 'papier cuissante.jpg', 'Papier cuisson', 'Emballages', 2.5],
  
  // Accessoires divers
  ['briquets', 'lighters.jpg', 'Briquets', 'Accessoires', 0.6],
]

export const products = productAssets.map(([handle, file, title, category, price]) => ({
  handle,
  title,
  category,
  price,
  compareAt: null,
  badge: 'New',
  images: [`/products/${encodeURIComponent(file)}`],
  description: `${title}, sélectionné par Big House.`,
  highlights: ['Sélection Big House', 'Livraison selon disponibilité'],
  similarHandles: [],
  hidePrice: false,
}))

export const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

export function getProduct(handle) {
  return products.find((p) => p.handle === handle)
}

export function getProductsByCategory(category) {
  if (!category || category === 'All') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.highlights || []).some((h) => h.toLowerCase().includes(q)),
  )
}

export function formatPrice(n, locale = 'fr') {
  const code = String(locale || 'fr').slice(0, 2)
  const loc = code === 'ar' ? 'ar-TN' : code === 'en' ? 'en-TN' : 'fr-TN'
  return `${new Intl.NumberFormat(loc).format(n)} DT`
}

/** Prefer explicit similarHandles, then same category + close price. */
export function getRelated(product, limit = 4) {
  const byHandle = (product.similarHandles || [])
    .map((h) => getProduct(h))
    .filter(Boolean)

  if (byHandle.length >= limit) return byHandle.slice(0, limit)

  const rest = products
    .filter((p) => p.handle !== product.handle && !byHandle.some((b) => b.handle === p.handle))
    .map((p) => ({
      p,
      score:
        (p.category === product.category ? 100 : 0) +
        (p.price === product.price ? 50 : 0) +
        Math.max(0, 40 - Math.abs(p.price - product.price) / 20),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)

  return [...byHandle, ...rest].slice(0, limit)
}

export const heroImage = products[6].images[0]
