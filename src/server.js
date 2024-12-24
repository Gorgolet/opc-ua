const {
    OPCUAServer,
    Variant,
    DataType
  } = require("node-opcua");
  
  // Fonction principale pour démarrer le serveur OPC UA
  async function startServer() {
    // 1. Création et configuration du serveur
    const server = new OPCUAServer({
      // Port d'écoute (par défaut 4334)
      port: 4334,
      // Chemin de la ressource (URL) où sera exposé le serveur
      resourcePath: "/UA/MyLittleServer",
      // Informations de build, pour la description du serveur
      buildInfo: {
        productName: "MyLittleServer",
        buildNumber: "1",
        buildDate: new Date()
      }
    });
  
    // 2. Initialisation du serveur
    await server.initialize();
  
    // 3. Création des objets et variables dans l’espace d’adressage
    const addressSpace = server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();
  
    // 3.1 Création d'un dossier (folder) dans l’espace d’adressage
    const myFolder = namespace.addFolder(addressSpace.rootFolder.objects, {
      browseName: "MyFolder"
    });
  
    // 3.2 Création d’une variable dans ce dossier
    namespace.addVariable({
      componentOf: myFolder,
      browseName: "MyVariable",
      nodeId: "ns=1;s=MyVariable", // identifiant unique
      dataType: "Double",
      value: {
        get: () => {
          // Par exemple, la variable renvoie la date/heure en timestamp
          const now = Date.now();
          return new Variant({ dataType: DataType.Double, value: now });
        }
      }
    });
  
    // 4. Démarrage du serveur
    await server.start();
  
    // 5. Affichage de l'URL du serveur dans la console
    console.log("Le serveur OPC UA est maintenant démarré.");
    console.log("URL du serveur :", server.endpoints[0].endpointDescriptions()[0].endpointUrl);
  }
  
  // Lancement de la fonction asynchrone
  startServer().catch((err) => {
    console.error("Une erreur s'est produite :", err);
  });
  