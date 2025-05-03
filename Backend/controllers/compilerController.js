const axios = require("axios");

exports.runCode = async (req, res) => {
  const { language_id, code, input } = req.body;

  const source_code = Buffer.from(code).toString("base64");
  const stdin = Buffer.from(input).toString("base64");

  try {
    const response = await axios.request({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": process.env.JUDGE0_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id,
        source_code,
        stdin,
      },
    });
    const tokenid = response.data.token;
    let statusCode = 2;
    let result;
    while (statusCode == 2 || statusCode === 1) {
      result = await getSubmission(tokenid);
      statusCode = result.status.id;
      console.log(result.data.status);
    }
    const final = await getSubmission(tokenid);
    const output = Buffer.from(final.data.stdout, "base64").toString("utf-8");
    console.log(output);
    res.status(200).json(response.data, { message: output });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Error executing code" });
  }
};

async function getSubmission(tokenid) {
  try {
    const response = await axios.request({
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${tokenid}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "4cd1f75be5msh1bd4d3f57f5c99cp1744d5jsn70e4ffea53a6",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
