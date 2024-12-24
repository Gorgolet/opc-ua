const {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds
  } = require("node-opcua");
  
  async function main() {
    try {
      // 1. Configuration du client
      const client = OPCUAClient.create({
        applicationName: "MyClient",
        securityMode: MessageSecurityMode.None,
        securityPolicy: SecurityPolicy.None,
        endpoint_must_exist: false
      });
  
      // 2. L'URL du serveur OPC UA (à adapter si nécessaire)
      const endpointUrl = "opc.tcp://localhost:4334/UA/MyLittleServer";
  
      // 3. Connexion au serveur
      console.log("Connexion au serveur OPC UA...");
      await client.connect(endpointUrl);
      console.log("Connecté au serveur !");
  
      // 4. Création d'une session
      const session = await client.createSession();
      console.log("Session OPC UA créée.");
  
      // 5. Lecture d'une variable (exemple : nodeId = ns=1;s=MyVariable)
      const nodeIdToRead = "ns=1;s=MyVariable";
      const dataValue = await session.read({
        nodeId: nodeIdToRead,
        attributeId: AttributeIds.Value
      });
      console.log(`Valeur lue pour ${nodeIdToRead} :`, dataValue.value.value);
  
      // 6. Fermeture de la session et déconnexion
      await session.close();
      console.log("Session fermée.");
      await client.disconnect();
      console.log("Client déconnecté.");
    } catch (err) {
      console.error("Erreur dans le client OPC UA :", err);
      process.exit(1);
    }
  }
  
  // Appel de la fonction main
  main();
  