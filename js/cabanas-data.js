/**
 * Datos de las cabañas de Bosques de Monterreal
 */
const CABANAS_DATA = {
    "estudio": {
        id: "estudio",
        nombre: "Estudio",
        badge: "Parejas",
        niveles: 1,
        dormitorios: 1,
        capacidad: { minima: 2, maxima: 2 },
        descripcion: "Estudio de una recámara con cama king size o dos camas matrimoniales. Cuenta con baño completo con tina de hidromasaje, pantalla plasma, microondas, frigobar, cafetera, mesa para 2 personas, chimenea y calentador de gas.",
        camas: ["1 cama King Size", "2 camas matrimoniales (opción alternativa)"],
        banos: { cantidad: 1, descripcion: "Baño completo con tina de hidromasaje" },
        amenidades: ["Pantalla plasma", "Microondas", "Frigobar", "Cafetera", "Mesa para 2 personas", "Chimenea", "Calentador de gas"],
        upgrade: { nombre: "Master Suite", amenidades: ["Cocineta equipada", "Refrigerador", "Comedor para 4 personas", "Sala de estar"] },
        ubicacion: null,
        imagenes: ["https://static.wixstatic.com/media/917730_d618f4d1dca64f6f80292aa7c964904c~mv2_d_3680_2456_s_4_2.jpg/v1/fill/w_1511,h_1009,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/917730_d618f4d1dca64f6f80292aa7c964904c~mv2_d_3680_2456_s_4_2.jpg"]
    },
    "1-dormitorio": {
        id: "1-dormitorio",
        nombre: "Cabaña de 1 Dormitorio",
        badge: null,
        niveles: 2,
        dormitorios: 1,
        capacidad: { minima: 4, maxima: 6 },
        descripcion: "Esta cabaña de dos niveles tiene un dormitorio con 2 camas matrimoniales. Cuenta con estancia con sofá cama, 2 baños completos con regadera, cocina equipada con estufa, refrigerador, microondas, cafetera, tostador, cubiertos y loza-sartenes. Comedor para 4 personas, chimenea y calentador de gas.",
        camas: ["2 camas matrimoniales (dormitorio)", "Sofá cama (estancia)"],
        banos: { cantidad: 2, descripcion: "Baños completos con regadera" },
        amenidades: ["Cocina equipada", "Estufa", "Refrigerador", "Microondas", "Cafetera", "Tostador", "Cubiertos y loza", "Sartenes", "Comedor para 4 personas", "Chimenea", "Calentador de gas"],
        upgrade: null,
        ubicacion: "500 metros de recepción",
        imagenes: [
            "https://static.wixstatic.com/media/917730_2a95754167e64e86880c9c69d88d086f~mv2_d_1840_1228_s_2.jpg/v1/fill/w_1472,h_982,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/917730_2a95754167e64e86880c9c69d88d086f~mv2_d_1840_1228_s_2.jpg",
            "https://static.wixstatic.com/media/917730_7b83aa07b082408ca129fcbc7206a0d3~mv2_d_1840_1228_s_2.jpg/v1/fill/w_1472,h_982,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/917730_7b83aa07b082408ca129fcbc7206a0d3~mv2_d_1840_1228_s_2.jpg",
            "https://static.wixstatic.com/media/917730_4ae4dc067fd84f6dafc1aa51955f3a68~mv2_d_1840_1228_s_2.jpg/v1/fill/w_1472,h_982,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/917730_4ae4dc067fd84f6dafc1aa51955f3a68~mv2_d_1840_1228_s_2.jpg"
        ]
    },
    "2-dormitorios": {
        id: "2-dormitorios",
        nombre: "Cabaña de 2 Dormitorios",
        badge: "Popular",
        niveles: 2,
        dormitorios: 2,
        capacidad: { minima: 4, maxima: 6 },
        descripcion: "Esta cabaña de 2 niveles es de dos dormitorios: uno con cama King size, segundo con dos camas matrimoniales. Cuenta con sala de estar con sofá cama, dos baños completos uno de ellos con tina de hidromasaje, el otro con regadera; 2 pantallas de plasma, cocina equipada con estufa, refrigerador, microondas, cafetera, tostador, licuadora, cubiertos y loza, sartenes. Comedor para 6 personas, chimenea, calentador de gas.",
        camas: ["1 cama King Size (dormitorio principal)", "2 camas matrimoniales (segundo dormitorio)", "Sofá cama (sala de estar)"],
        banos: { cantidad: 2, descripcion: "1 con tina de hidromasaje, 1 con regadera" },
        amenidades: ["Sala de estar con sofá cama", "2 pantallas de plasma", "Cocina equipada", "Estufa", "Refrigerador", "Microondas", "Cafetera", "Tostador", "Licuadora", "Cubiertos y loza", "Sartenes", "Comedor para 6 personas", "Chimenea", "Calentador de gas"],
        upgrade: { nombre: "Upgrade disponible", amenidades: ["Comunícate con nosotros para más información"] },
        ubicacion: "500 metros de recepción",
        imagenes: [
            "https://static.wixstatic.com/media/917730_0fa8cf7764ef4982a513bbba74e0974d~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_0fa8cf7764ef4982a513bbba74e0974d~mv2.jpg",
            "https://static.wixstatic.com/media/917730_e0cf57d47f49409d8a33c5931eda51b5~mv2.jpg/v1/fill/w_640,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_e0cf57d47f49409d8a33c5931eda51b5~mv2.jpg",
            "https://static.wixstatic.com/media/917730_15cb76c7544641f887e4e30f0b15211c~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_15cb76c7544641f887e4e30f0b15211c~mv2.jpg",
            "https://static.wixstatic.com/media/917730_eb9af583785941f885453833d5c6fa1e~mv2.jpg/v1/fill/w_640,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_eb9af583785941f885453833d5c6fa1e~mv2.jpg",
            "https://static.wixstatic.com/media/917730_a3e3d368de544670aa38acff533c4c9e~mv2.jpg/v1/fill/w_640,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_a3e3d368de544670aa38acff533c4c9e~mv2.jpg",
            "https://static.wixstatic.com/media/917730_63787ac6e48741bc89cf818e55215280~mv2.jpg/v1/fill/w_640,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_63787ac6e48741bc89cf818e55215280~mv2.jpg",
            "https://static.wixstatic.com/media/917730_7364aecc2b6a43cc833954f06bf913c4~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_7364aecc2b6a43cc833954f06bf913c4~mv2.jpg",
            "https://static.wixstatic.com/media/917730_64d9e64c254647b8afde1d131815dfd4~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_64d9e64c254647b8afde1d131815dfd4~mv2.jpg"
        ]
    },
    "3-dormitorios": {
        id: "3-dormitorios",
        nombre: "Cabaña de 3 Dormitorios",
        badge: "Familiar",
        niveles: 2,
        dormitorios: 3,
        capacidad: { minima: 6, maxima: 8 },
        descripcion: "Esta cabaña de 2 niveles se distribuye en 3 recámaras: la primera con una cama King size, segunda con una matrimonial, tercera con una matrimonial e individual. También cuenta con un tapanco con sofá cama matrimonial. Además de una sala de estar, 3 baños completos con regadera, pantalla plasma, cocina equipada con estufa, refrigerador, microondas, cafetera, tostador, licuadora, cubiertos y loza-sartenes. Comedor para 8 personas, área de asador exterior y picnic, chimenea y calentador de gas.",
        camas: ["1 cama King Size (dormitorio 1)", "1 cama matrimonial (dormitorio 2)", "1 cama matrimonial + 1 individual (dormitorio 3)", "Sofá cama matrimonial (tapanco)"],
        banos: { cantidad: 3, descripcion: "Baños completos con regadera" },
        amenidades: ["Sala de estar", "Tapanco con sofá cama", "Pantalla plasma", "Cocina equipada", "Estufa", "Refrigerador", "Microondas", "Cafetera", "Tostador", "Licuadora", "Cubiertos y loza", "Sartenes", "Comedor para 8 personas", "Área de asador exterior", "Área de picnic", "Chimenea", "Calentador de gas"],
        upgrade: { nombre: "Upgrade Premium", amenidades: ["Sofá cama matrimonial", "Mesa de billar", "Sauna", "Jacuzzi individual", "Home theater"] },
        ubicacion: "1.5 KM de recepción (camino empedrado)",
        imagenes: [
            "https://static.wixstatic.com/media/917730_50cb46c8277e45bf846977da3196254b~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_50cb46c8277e45bf846977da3196254b~mv2.jpg",
            "https://static.wixstatic.com/media/917730_e013c8e4c63a4507a0d62b74a832bbec~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_e013c8e4c63a4507a0d62b74a832bbec~mv2.jpg",
            "https://static.wixstatic.com/media/917730_d13641b0570947eda329cd2f5a52adfc~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_d13641b0570947eda329cd2f5a52adfc~mv2.jpg",
            "https://static.wixstatic.com/media/917730_7d2ec2ab4e3e4114bb8a34dbe7581188~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_7d2ec2ab4e3e4114bb8a34dbe7581188~mv2.jpg",
            "https://static.wixstatic.com/media/917730_d93d68d23cc34e60aa5fb656029c3509~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_d93d68d23cc34e60aa5fb656029c3509~mv2.jpg",
            "https://static.wixstatic.com/media/917730_034b65f83a93495c8b253b9bdc4f3d55~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_034b65f83a93495c8b253b9bdc4f3d55~mv2.jpg",
            "https://static.wixstatic.com/media/917730_fce74c63636c4300b40f15eeff1104c6~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_fce74c63636c4300b40f15eeff1104c6~mv2.jpg",
            "https://static.wixstatic.com/media/917730_11d1ce5d3f74460682962c098fdf2c79~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_11d1ce5d3f74460682962c098fdf2c79~mv2.jpg"
        ]
    },
    "4-dormitorios": {
        id: "4-dormitorios",
        nombre: "Cabaña de 4 Dormitorios",
        badge: "Grupos",
        niveles: null,
        dormitorios: 4,
        capacidad: { minima: 12, maxima: 16 },
        descripcion: "Este tipo de cabaña es de 4 dormitorios, además de una sala de estar. Tiene 3 baños completos con regadera y uno con tina de hidromasaje, pantalla plasma, cocina equipada con estufa, refrigerador, microondas, cafetera, tostador, licuadora, cubiertos y loza-sartenes. Comedor para 8 personas, área de asador exterior y picnic, chimenea y calentador de gas.",
        camas: ["4 dormitorios amplios"],
        banos: { cantidad: 4, descripcion: "3 con regadera, 1 con tina de hidromasaje" },
        amenidades: ["Sala de estar", "Pantalla plasma", "Cocina equipada", "Estufa", "Refrigerador", "Microondas", "Cafetera", "Tostador", "Licuadora", "Cubiertos y loza", "Sartenes", "Comedor para 8 personas", "Área de asador exterior", "Área de picnic", "Chimenea", "Calentador de gas"],
        upgrade: { nombre: "Upgrade Premium", amenidades: ["Sofá cama matrimonial", "Mesa de billar", "Sauna", "Jacuzzi individual", "Home theater"] },
        ubicacion: "2 KM de recepción (pendiente inclinada)",
        imagenes: [
            "https://static.wixstatic.com/media/917730_f27f704fcbc84209ab10128033e42dd3~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_f27f704fcbc84209ab10128033e42dd3~mv2.jpg",
            "https://static.wixstatic.com/media/917730_71978868c8004fd9b482b494664dacdd~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_71978868c8004fd9b482b494664dacdd~mv2.jpg",
            "https://static.wixstatic.com/media/917730_f0a639e61e1c4c61b9386b7ecdccf5cf~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_f0a639e61e1c4c61b9386b7ecdccf5cf~mv2.jpg",
            "https://static.wixstatic.com/media/917730_360bc38ff2f645a2a44f63a4c72b6ac1~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_360bc38ff2f645a2a44f63a4c72b6ac1~mv2.jpg",
            "https://static.wixstatic.com/media/917730_5d5fa3940fae48a0b7e2dde42506bc1e~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_5d5fa3940fae48a0b7e2dde42506bc1e~mv2.jpg",
            "https://static.wixstatic.com/media/917730_baaaa7e96c464c52a738a39bb9625444~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_baaaa7e96c464c52a738a39bb9625444~mv2.jpg",
            "https://static.wixstatic.com/media/917730_f1cd8ec27fdf40f9a5005be5b8a87529~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_f1cd8ec27fdf40f9a5005be5b8a87529~mv2.jpg",
            "https://static.wixstatic.com/media/917730_bdac2224b1494a42bc02caae670eb525~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_bdac2224b1494a42bc02caae670eb525~mv2.jpg",
            "https://static.wixstatic.com/media/917730_e5f9bfeaabc14e19bdbd565f9bc731c0~mv2.jpg/v1/fill/w_512,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_e5f9bfeaabc14e19bdbd565f9bc731c0~mv2.jpg",
            "https://static.wixstatic.com/media/917730_aa6e280acf89481cabfd9d994b9d6076~mv2.jpg/v1/fill/w_342,h_512,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/917730_aa6e280acf89481cabfd9d994b9d6076~mv2.jpg"
        ]
    }
};

/**
 * Obtener cabaña por ID
 */
function getCabanaById(id) {
    return CABANAS_DATA[id] || null;
}

/**
 * Obtener ID de cabaña desde URL
 */
function getCabanaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

