Frontend:




after done backend file ready - npm install axios

ForBackend:

npm init -y
npm install bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer stripe
npm install nodemon --save-dev

muhtasim pass:muhtasim123

http://localhost:4000/api/user/register

{
    "name": "Demofirsta",
    "email": "demo@dda.dev",
    "password": "123456789"
}




















// Function to automatically add dummy products
// export const addAllProducts = async () => {
//     try {

//         const allProducts = [
//             // Medicine
//             {
//                 _id: "sergel_20mg",
//                 name: "Sergel 20mg",
//                 category: "Medicine",
//                 price: 70,
//                 offerPrice: 65,
//                 image: [path.resolve(__dirname, '../assets/sergel_image.png')],
//                 description: [
//                     "Capsule strip 1*10",
//                     "Esomeprazole Magnesium Trihydrate",
//                     "Healthcare Pharmaceuticals Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "napa-500mg",
//                 name: "Napa 500mg",
//                 category: "Medicine",
//                 price: 120,
//                 offerPrice: 105,
//                 image: [path.resolve(__dirname, '../assets/napa_image.png')],
//                 description: [
//                     "Tablet Strip 1*10 ",
//                     "Paracetamol",
//                     "Beximco Pharmaceuticals Ltd.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "fexo-120mg",
//                 name: "Fexo 120mg",
//                 category: "Medicine",
//                 price: 90,
//                 offerPrice: 85,
//                 image: [path.resolve(__dirname, '../assets/fexo_image.png')],
//                 description: [
//                     "Tablet ",
//                     "Fexofenadine Hydrochloride",
//                     "Square Pharmaceuticals PLC.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "maxpro-20mg",
//                 name: "maxpro 20mg",
//                 category: "Medicine",
//                 price: 98,
//                 offerPrice: 95,
//                 image: [path.resolve(__dirname, '../assets/maxpro_image_1.png')],
//                 description: [
//                     "Tablet 14pcs x 1strip",
//                     "Esomeprazole Magnesium Trihydrate",
//                     "Renata Limited",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "coracal-dx-",
//                 name: "coralcal-dx 600mg",
//                 category: "Medicine",
//                 price: 170,
//                 offerPrice: 160,
//                 image: [path.resolve(__dirname, '../assets/coralcal_dx_image_1.png')],
//                 description: [
//                     "Tablet",
//                     "Calcium Carbonate [Elemental] + Vitamin D3",
//                     "Radiant Pharmaceuticals Ltd.",
//                 ],
//                 inStock: true,
//             },

//             // Diabetic
//             {
//                 _id: "ek55j56k",
//                 name: "Quick Check Blood Glucose Meter",
//                 category: "Diabetic",
//                 price: 1500,
//                 offerPrice: 1350,
//                 image: [path.resolve(__dirname, '../assets/quickchecker_machine_image_1.png')],
//                 description: [
//                     "Glucometer Machine",
//                     "Self Monitoring Blood Glucose System",
//                     "Vivacheck Biotech Inc. Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek51j12k",
//                 name: "DispoVan Syringe 100IU",
//                 category: "Diabetic",
//                 price: 10,
//                 offerPrice: 9.5,
//                 image: [path.resolve(__dirname, '../assets/dispoVan_syringe_image.png')],
//                 description: [
//                     "1 pics",
//                     "Single Use Insulin Syringes",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek52j23k",
//                 name: "GlucoLeader Enhance Red Test Strip-25",
//                 category: "Diabetic",
//                 price: 462,
//                 offerPrice: 450,
//                 image: [path.resolve(__dirname, '../assets/glucoLeader_red_test_image.png')],
//                 description: [
//                     "Test Strip",
//                     "Blood Glucose Strips",
//                     "Vivacheck Biotech Inc. Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek53j34k",
//                 name: "GlucoLeader Enhance Red Test Strip-25",
//                 category: "Diabetic",
//                 price: 462,
//                 offerPrice: 450,
//                 image: [path.resolve(__dirname, '../assets/glucoLeader_blue_test_image_1.png')],
//                 description: [
//                     "Test Strip",
//                     "Blood Glucose Strips",
//                     "Vivacheck Biotech Inc. Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek54j45k",
//                 name: "Blood Lancets (Mediron)",
//                 category: "Diabetic",
//                 price: 120,
//                 offerPrice: 110,
//                 image: [path.resolve(__dirname, '../assets/blood_lancets_image_1.png')],
//                 description: [
//                     "Twist Type",
//                     "Needle",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },

//             // devices
//             {
//                 _id: "ek56j67k",
//                 name: "Digital Thermometer",
//                 category: "devices",
//                 price: 260,
//                 offerPrice: 255,
//                 image: [path.resolve(__dirname, '../assets/digital_thermometer_image.png')],
//                 description: [
//                     "Digital thermometer",
//                     "1pcs",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek57j78k",
//                 name: "Pulse Oximeter (Jumper)",
//                 category: "devices",
//                 price: 1600,
//                 offerPrice: 1550,
//                 image: [path.resolve(__dirname, '../assets/oximeter_image.png')],
//                 description: [
//                     "Surgical Kit",
//                     "Pulse Oximeter",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek58j89k",
//                 name: "Blood Pressure Machine Digital (ALPK2)",
//                 category: "devices",
//                 price: 2500,
//                 offerPrice: 2000,
//                 image: [path.resolve(__dirname, '../assets/blood_pressure_image.png')],
//                 description: [
//                     "Pressure Machine Digital",
//                     "Blood Pressure Machine With Stethoscope",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek59j90k",
//                 name: "Pulse Oximeter (ProCare)",
//                 category: "devices",
//                 price: 1275,
//                 offerPrice: 1250,
//                 image: [path.resolve(__dirname, '../assets/oximeter_image_1.png')],
//                 description: [
//                     "Surgical Kit",
//                     "Pulse Oximeter",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek60j01k",
//                 name: "ProCare Digital Weight Machine Scale - Orange",
//                 category: "devices",
//                 price: 140,
//                 offerPrice: 130,
//                 image: [path.resolve(__dirname, '../assets/weightm_image.png')],
//                 description: [
//                     "Weight Matchine",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },

//             // baby_care
//             {
//                 _id: "ek61j12k",
//                 name: "NeoCare Baby Wipes",
//                 category: "baby_care",
//                 price: 235,
//                 offerPrice: 230,
//                 image: [path.resolve(__dirname, '../assets/neocare_baby_image.png')],
//                 description: [
//                     "wipes",
//                     "Wipes 120pcs ",
//                     "Incepta Pharmaceuticals Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek62j23k",
//                 name: "Savlon Baby Wipes",
//                 category: "baby_care",
//                 price: 270,
//                 offerPrice: 260,
//                 image: [path.resolve(__dirname, '../assets/savlonwipes_image.png')],
//                 description: [
//                     "wipes",
//                     "Wipes 120pcs ",
//                     "Incepta Pharmaceuticals Ltd",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek63j34k",
//                 name: "Neocarediaper ",
//                 category: "baby_care",
//                 price: 640,
//                 offerPrice: 610,
//                 image: [path.resolve(__dirname, '../assets/neocarediaper_image_1.png')],
//                 description: [
//                     "Baby Care",
//                     "Diaper",
//                     "Incepta Pharmaceuticals Ltd.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek64j45k",
//                 name: "Neocare Belt Diaper",
//                 category: "baby_care",
//                 price: 1200,
//                 offerPrice: 1150,
//                 image: [path.resolve(__dirname, '../assets/neocarebelt_image_1.png')],
//                 description: [
//                     "Baby Care",
//                     "Diaper",
//                     "Incepta Pharmaceuticals Ltd.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek61j12k",
//                 name: "NeoCare Baby Wipes",
//                 category: "baby_care",
//                 price: 235,
//                 offerPrice: 230,
//                 image: [path.resolve(__dirname, '../assets/neocare_baby_image.png')],
//                 description: [
//                     "wipes",
//                     "Wipes 120pcs ",
//                     "Incepta Pharmaceuticals Ltd",
//                 ],
//                 inStock: true,
//             },

//             // dentals
//             {
//                 _id: "ek66j67k",
//                 name: "Orostar Plus 250 ml",
//                 category: "dentals",
//                 price: 150,
//                 offerPrice: 140,
//                 image: [path.resolve(__dirname, '../assets/orostar_image.png')],
//                 description: [
//                     "Mouthwash",
//                     "Eucalyptol + Menthol + Methyl Salicylate + Thymol + Sodium Fluoride",
//                     "Square Pharmaceuticals PLC.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek67j78k",
//                 name: "Mediplus DS140 gm",
//                 category: "dentals",
//                 price: 250,
//                 offerPrice: 230,
//                 image: [path.resolve(__dirname, '../assets/mediplus_image.png')],
//                 description: [
//                     "Toothpaste",
//                     "Anfords",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek68j89k",
//                 name: "Mediplus Toothbrush",
//                 category: "dentals",
//                 price: 90,
//                 offerPrice: 80,
//                 image: [path.resolve(__dirname, '../assets/brush_image.png')],
//                 description: [
//                     "Toothbrush",
//                     "Anfords",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek69j90k",
//                 name: "Sensodyne Repair & Protect 70 gm",
//                 category: "dentals",
//                 price: 360,
//                 offerPrice: 340,
//                 image: [path.resolve(__dirname, '../assets/synsodine_image.png')],
//                 description: [
//                     "Toothpaste",
//                     "GSK",
//                     "Good source of magnesium",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "ek70j01k",
//                 name: "Colgate Active Salt Toothpaste 200 gm",
//                 category: "dentals",
//                 price: 240,
//                 offerPrice: 220,
//                 image: [path.resolve(__dirname, '../assets/colgate_image.png')],
//                 description: [
//                     "Toothpaste",
//                     "Colgate",
//                 ],
//                 inStock: true,
//             },

//             // hygiene
//             {
//                 _id: "bk01a24z",
//                 name: "Dettol Liquid  750 ml",
//                 category: "hygiene",
//                 price: 250,
//                 offerPrice: 235,
//                 image: [path.resolve(__dirname, '../assets/dettol_image.png')],
//                 description: [
//                     "Antiseptic",
//                     "Antiseptic Disinfectant",
//                     "Reckitt & Benckiser Bangladesh Ltd.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "bk02b30y",
//                 name: "Sepnil Hand Sanitizer 200ml",
//                 category: "hygiene",
//                 price: 250,
//                 offerPrice: 245,
//                 image: [path.resolve(__dirname, '../assets/sepnilh_image.png')],
//                 description: [
//                     "Hand Sanitizer",
//                     "Square Toiletries Ltd.",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "bk03c31x",
//                 name: "Godrej AER Power Pocket Sea Breeze Delight 10gm",
//                 category: "hygiene",
//                 price: 70,
//                 offerPrice: 65,
//                 image: [path.resolve(__dirname, '../assets/godrej_image.png')],
//                 description: [
//                     "Bathroom Freshener",
//                     "Bathroom Fragrance",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "bk04d32w",
//                 name: "Sparkbliss Lavender Liquid Detergent 500ml",
//                 category: "hygiene",
//                 price: 150,
//                 offerPrice: 120,
//                 image: [path.resolve(__dirname, '../assets/liquidd_image.png')],
//                 description: [
//                     "Detergent",
//                     "Be.Best Enterprise",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "bk03c31x",
//                 name: "Godrej AER Power Pocket Sea Breeze Delight 10gm",
//                 category: "hygiene",
//                 price: 70,
//                 offerPrice: 65,
//                 image: [path.resolve(__dirname, '../assets/godrej_image.png')],
//                 description: [
//                     "Bathroom Freshener",
//                     "Bathroom Fragrance",
//                 ],
//                 inStock: true,
//             },

//             // woman_choice
//             {
//                 _id: "freedom_heavy_flow",
//                 name: "Freedom Heavy Flow Wings",
//                 category: "woman_choice",
//                 price: 200,
//                 offerPrice: 190,
//                 image: [path.resolve(__dirname, '../assets/freedom_image.png')],
//                 description: [
//                     "Sanitary Napkin",
//                     "16 pcs",
//                     "ACI Consumer Brands",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "femicon",
//                 name: "Femicon",
//                 category: "woman_choice",
//                 price: 45,
//                 offerPrice: 40,
//                 image: [path.resolve(__dirname, '../assets/femipil_image.png')],
//                 description: [
//                     "Tablet 28pcs",
//                     "Ethinylestradiol + Ferrous Fumarate + Norgestrel",
//                     "SMC Enterprise Limited",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "minicon_pill",
//                 name: "Minicon",
//                 category: "woman_choice",
//                 price: 50,
//                 offerPrice: 48,
//                 image: [path.resolve(__dirname, '../assets/minicon_image.png')],
//                 description: [
//                     "Pills tablet 28pcs",
//                     "Norgestrel",
//                     "SMC Enterprise Limited",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "in04i28r",
//                 name: "Joya Wings Regular Flow",
//                 category: "woman_choice",
//                 price: 80,
//                 offerPrice: 78,
//                 image: [path.resolve(__dirname, '../assets/joya_pad_image.png')],
//                 description: [
//                     "Sanitary Napkin 8+2 pads",
//                     "SMC Enterprise Limited",
//                 ],
//                 inStock: true,
//             },
//             {
//                 _id: "pregnacy_test_getwell",
//                 name: "Get Sure Pregnancy Test kit (Getwell)",
//                 category: "woman_choice",
//                 price: 40,
//                 offerPrice: 35,
//                 image: [path.resolve(__dirname, '../assets/pregnacy_test_image.png')],
//                 description: [
//                     "Pregnancy Test Strip",
//                     "1pcs",
//                     "Technokit Healthcare Ltd",
//                 ],
//                 inStock: true,
//             },
//         ];




//         // Loop through dummy products and upload their images to Cloudinary
//         await Promise.all(
//             allProducts.map(async (product) => {
//                 const { name, category, price, offerPrice, description, image, inStock } = product;

//                 // Upload product images to Cloudinary
//                 const imagesUrl = await Promise.all(
//                     image.map(async (item) => {
//                         const imagePath = path.resolve(item); // Resolve local path

//                         // Check if image exists in the local file system
//                         if (!fs.existsSync(imagePath)) {
//                             console.log(`Image not found: ${imagePath}`);
//                             return;
//                         }

//                         const result = await cloudinary.uploader.upload(imagePath, {
//                             resource_type: 'image',
//                         });

//                         return result.secure_url;
//                     })
//                 );

//                 // Create product in MongoDB with Cloudinary URLs and inStock field
//                 await Product.create({
//                     name,
//                     category,
//                     price,
//                     offerPrice,
//                     description,
//                     image: imagesUrl,
//                     inStock: inStock || true,  // Default to true if not provided
//                 });

//                 console.log(`Product added: ${name}`);
//             })
//         );

//         console.log('All dummy products added successfully!');
//     } catch (error) {
//         console.error('Error adding dummy products:', error.message);
//     }
// };
