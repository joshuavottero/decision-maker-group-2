const pollCreateEmail = function () {
  const emailData = {
    "from":'DECISION MAKER <me@samples.mailgun.org>',
    "to": req.body.email,
    "subject": req.body.pollTitle,
    "text": `Hello, ${req.body.name}!
    Vote by ${req.body.date}
    To vote: http://localhost:8080/polls/${pollId}.
    To check the results: http://localhost:8080/polls/${pollId}/results.

          Thanks for using DECISION MAKER!`
    };
    return emailData;
};
