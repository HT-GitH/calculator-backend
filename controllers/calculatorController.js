const Calculation = require('../models/Calculation');

async function performCalculation(req, res) {
    const url = req.url;
    console.log(url);
    const tokens = url.split('/');
    console.log(tokens,tokens.length)
  
    

    for (let i = 2; i < tokens.length; i += 2) {
      if(tokens[i]==="divide"){
        tokens[i-1]=tokens[i-1]/tokens[i+1];
        tokens.splice(i,i)
      }

    }
    for (let i = 2; i < tokens.length; i += 2) {
    if(tokens[i]==="into"){
        tokens[i-1]=tokens[i-1]*tokens[i+1];
        tokens.splice(i,i)
      }
      continue;
    }
    console.log(tokens,tokens.length);
    let result = parseFloat(tokens[1]);
    for (let i = 2; i < tokens.length; i += 2) {
        const operation = tokens[i];
        const operand = parseInt(tokens[i + 1]);

        switch (operation) {
            case 'plus':
              result += operand;
              break;
            case 'minus':
              result -= operand;
              break;
            default:
              return res.status(400).json({ message: 'Invalid operation' });
          }

      }
    
    const calculation = new Calculation({
      operation: url,
      result,
    });
  
    await calculation.save();
    return res.json({ question: url, answer: result });
  }
  
  

async function getHistory(req, res) {
  try {
    const history = await Calculation.find({})
      .sort({ createdAt: -1 })
      .limit(20);
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching history' });
  }
}

module.exports = { performCalculation, getHistory };
