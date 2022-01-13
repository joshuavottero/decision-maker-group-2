const sendEmail = function (email, pollTitle, creator, voteUrl, resultstUrl, descriptionDate){
  const emailData = {
    from:'DECISION MAKER <me@samples.mailgun.org>',
    to: email,
    subject: `Poll: ${pollTitle}`,
    html:`<html> Hello, ${creator}!
    <br>
    <div>
   <a href="${voteUrl}">Vote Here</a>
   </div>
   <br><div> by ${descriptionDate} </div>
    <br><br>
    <div>
  <a href="${resultstUrl}">Results </a>
</div>
<br>
Thanks for using Decision Maker!
</html>`
  }
  return emailData;
};

module.exports = {sendEmail};
