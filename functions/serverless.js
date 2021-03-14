// domain/.netlify/funtions/serverless

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'hello world ',
  }
}
