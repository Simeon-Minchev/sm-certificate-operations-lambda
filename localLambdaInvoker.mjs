import { handler } from "./index.mjs";

const event = {
};

handler(event, {}, (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Lambda function result:', result);
  }
});