var grpc = require('grpc');

const PROTO_PATH = 'octlserver.proto';
const octlProto = grpc.load(PROTO_PATH);

var client = new octlProto.octl.Octl('127.0.0.1:8080', 
  grpc.credentials.createInsecure());


// const envId = createEnv();
// printEnv(envId);
trackStatus();

function createEnv() {
  client.NewEnvironment({roles: ['flp3', 'epn2']}, function(error, response) {
    if (error) {
      console.log('Error: ', error);
    }   
    else {
      return response.id;
    }   
  });
}

function printEnv(envId) {
  client.GetEnvironment({id: envId}, function(error, response) {
    if (error) {
      console.log('Error: ', error);
    }
    else {
      console.log(response);
    }
  });
}

function trackStatus() {
  const call = client.TrackStatus({});
  call.on('data', function(data) {
     console.log(data);
  });
  call.on('end', function() {
    console.log('END: TrackStatus');
  });
  call.on('status', function(status) {
    console.log('STATUS: TrackStatus');
  });
}
