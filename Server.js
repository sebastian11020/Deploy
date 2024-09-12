const express = require('express');
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();
const app = express();
const port = 3000;

app.use(express.static('public'));

// Manejar la solicitud POST a '/deploy'
app.post('/deploy', async (req, res) => {
  try {
    // Conectar al servidor SSH
    await ssh.connect({
      host: 'ip_servidor',               // Reemplaza con la IP o dominio de tu servidor
      username: 'usuario',               // Reemplaza con el nombre de usuario
      privateKey: '/ruta/a/tu/clave/id_rsa' // Reemplaza con la ruta a tu clave privada
    });


    const result = await ssh.execCommand('bash /ruta/al/script/deploy.sh'); // Reemplaza con la ruta a tu script

    console.log('STDOUT: ' + result.stdout);
    console.error('STDERR: ' + result.stderr);


    res.send('Despliegue completado.');
    

    ssh.dispose();
  } catch (err) {

    console.error('Error de conexión SSH:', err);
    res.status(500).send('Error en el despliegue.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
