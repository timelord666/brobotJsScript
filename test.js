function getTemplates() {
  return ["link", 'foto']; // шаблоны используются только в овтетах бота, добавте сюда шаблон и сможете его установить в интерфейсе, в коде испольщовать так: {foto}
}

const aq = {
  'ну ты и актер': ['1?', 'как вам подарок', 'каквамподарок'],
  'тест': ['тестовый вопрос', 'тестовый вопрос?', 'тестовыйвопрос'], // это объект с ответами и возможными вариациями вопроса, добавляйте по примеру
}

const context = ['я не против', 'я пошла гулять']; // сообщения которые не игнорируются если в них есть игнорируемые слова


 
function findWord(word, str) {
  return str.split(" ").some(function(w) {
    return w === word;
  });
}

function hasContext(str) {
  let flag = false;
  context.forEach(function(cont) {
    if (cont === str) {
      flag = true;
      return;
    }
  })
  return flag;
}

function hasKeyword(str, num_messages) {
  let formated_str = str.replace(',', '').toLowerCase();
  if (hasContext(str)) return false;
  if (+num_messages == 2) return findWord("нет", formated_str) || findWord("не", formated_str) || findWord("пошла", formated_str) || findWord("иди", formated_str) || findWord("не,", formated_str) || findWord("нет,", formated_str) || findWord("ебу", formated_str) || findWord("мошенники", formated_str) || findWord("мошеники", formated_str) || findWord("нахуй", formated_str) || findWord("простите", formated_str) || findWord("компьютер сломался", formated_str) || findWord("бот", formated_str) || findWord("фейк", formated_str) || findWord("врете", formated_str) || findWord("врёте", formated_str) || findWord("лечение", formated_str) || findWord("поведусь", formated_str) || findWord("отъебись", formated_str) || findWord("отьебись", formated_str)
}

function specifiedAnswer(str) {
  str = str.toLowerCase().replace(',', '');
  let answer = '';


  for (ans in aq) {
    aq[ans].forEach(function (question) {
      if (question === str) {
        answer = ans;
        return;
      }
    })

  }

  if (answer) {
    return answer;
  } else {
    return false;
  }
}

function statistics(amSent, lastMsg, tools, hist) {
  if (!(hist.localContact().getAlias() === 'localContact')) {
    if (amSent === 1) {
      tools.writeToFile('Полученные ответы на 1 сообщение анкетой ' + hist.localContact().getAlias() + ' от ' + hist.externalContact().getAlias() + '.txt', lastMsg + '/');

    } else if (amSent === 2) {
      tools.writeToFile('Полученные ответы на 2 сообщение анкетой ' + hist.localContact().getAlias() + ' от ' + hist.externalContact().getAlias() + '.txt', lastMsg + '/');
    } else if (amSent === 3) {
      tools.writeToFile('Полученные ответы на 3 сообщение анкетой ' + hist.localContact().getAlias() + ' от ' + hist.externalContact().getAlias() + '.txt', lastMsg + '/');

    }






  }
}



 
function getNextAnswer(chislo_otpravlennih, tools) {
  switch (chislo_otpravlennih) {
    case 0: return '0';
    case 1: return "Вот фотка [image:C:\\images\\{foto}]";
    case 2: return pause(180000);

  }
  return null;
}
  // checkNonText игнорирует не текстовые сообщения, отключается в конце скрипта 
function checkNonText(msg) { 
  if ((msg === '<audio_message/>')
   || (msg === '<photo/>')
    || !msg
     || (msg === '<пересланное сообщение/>')
      || (msg === '<несколько картинок/>')
       || (msg === '<картинка/>')
        || (msg === '<голосовое сообщение/>')) {
    return true;

  } else {
    return false;
  }
}
 
function getAnswer(hist, log, tools) {
  var otpravlennie = hist.getMessagesFromLocalContact();
  var chislo_otpravlennih = otpravlennie.size();
  var prishedshie = hist.getMessagesFromExternalContact();
  var last_message = prishedshie.last().content().trim();
  var specAnswer = specifiedAnswer(last_message);
  if (specAnswer) {
    return specAnswer;
  }
  var otvet = getNextAnswer(chislo_otpravlennih, tools);
  log.info('recivedText' + chislo_otpravlennih + hist.localContact().getHomePageUrl() + ': /' + last_message);
  statistics(chislo_otpravlennih, last_message, tools, hist);
  






  if (chislo_otpravlennih > 0) log.info('recived' + chislo_otpravlennih + hist.localContact().getHomePageUrl());
  


  if (otvet === null) 
  

    return null;
  
  else if (chislo_otpravlennih > 0 && (otpravlennie.get(chislo_otpravlennih - 1).content().trim() == otvet.trim()
   || hasKeyword(last_message, chislo_otpravlennih) || checkNonText(last_message)))
        return null;

   

  else return otvet;
}

