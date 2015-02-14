/*
Copyright Nikolay Avdeev aka NickKolok aka Николай Авдеев 2015

Всем привет из снежного Воронежа! 

This file is part of CHAS-CORRECT.

    CHAS-CORRECT is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CHAS-CORRECT is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

  (Этот файл — часть CHAS-CORRECT.

   CHAS-CORRECT - свободная программа: вы можете перераспространять её и/или
   изменять её на условиях Стандартной общественной лицензии GNU в том виде,
   в каком она была опубликована Фондом свободного программного обеспечения;
   либо версии 3 лицензии, либо (по вашему выбору) любой более поздней
   версии.

   CHAS-CORRECT распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <http://www.gnu.org/licenses/>.)
*/
'use strict';

var oldTime = new Date().getTime();

var sya="(?=(?:ся|)(?:[^А-Яа-яЁёA-Za-z]|^|$))";
var ca="ц*[ао]";

var orphoWordsToCorrect=[
/*
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["отве[дт]ь*те","ответьте"],
	["не[\\s-]*охото","неохота"],
	["не-охота","неохота"],
	["хотя-*бы","хотя бы"],
	["душь","душ"],
	["какайа-*то","какая-то"],
	["погеройски","по-геройски"],
	["по-соседству","по соседству"],
	["по-привычке","по привычке"],
	["ч[ёо]","что"],
	["по-новой","по новой"],
	["по-русскому","по русскому"],
	["по-тихоньку","потихоньку"],
	["по-полной","по полной"],
	["ес+-н+о","естественно"],
	["по-старинке","по старинке"],
	["по-ходу","походу"],
	["дада","да-да"],
	["кати"+ca,"катиться"],
	["с[чщ]а[зс]*","сейчас"],
	["станови"+ca,"становится"],
	["н[ие]чё","ничего"],
	["валя"+ca,"валяться"],
	["валяю"+ca,"валяются"],
	["буд-то","будто"],
	["то-есть","то есть"],
	["чьято","чья-то"],
	["рытся","рыться"],
	["напится","напиться"],
	["добится","добиться"],
	["режеться","режется"],
	["уборщиться","уборщица"],
	["померять*ся","помериться"],
	["мерять*cя","мериться"],
	["менятся","меняться"],
	["прид[её]ться","придётся"],
	["поумолчанию","по умолчанию"],
	["что нибу[дт]ь","что-нибудь"],
	["по мимо","помимо"],
	["кое как","кое-как"], //TODO: аналоги
	["в[\\s-]*конце[\s-]*то[\\s-]*концов","в конце-то концов"],
	["ни[\\s-]*при[\\s-]*ч[еёо]м","ни при чём"],//Да, это два разных!
	["не[\\s-]*при[\\s-]*ч[еёо]м","не при чем"],
	["не-*зря","не зря"],
	["кста","кстати"],
	["мужич[ёе]к","мужичок"],
	["однажду","однажды"],
	["по возражав","повозражав"],
	["счас","сейчас"],
	["бе[сз]толоч","бестолочь"],
	["во внутрь","вовнутрь"],
	["что-*ль","что ль"],//TODO: просклонять
	["грит","говорит"],//TODO: добить окончаниями
	["шо","что"],
	["бля","эх"],//Ибо сил моих больше нет
	["шт*об","чтоб"],
	["знач","значит"],
	["корочь*","короче"],
	["выб","вы б"],
	["по женски","по-женски"],
	["привстрече","при встрече"],
	["всеже","все же"],
	["всёже","всё же"],
	["недействует","не действует"],
	["красивше","красивее"],
	["доевши","доев"],
	["помаги","помоги"],//Помагичить
	["не-*был","не был"],
	["не-*была","не была"],
	["не-*было","не было"],
	["не-были","не были"],
	["хоч[еи]м","хотим"],//хохочем
	["хотишь","хочешь"],
	["хоч[еи]те","хотите"],
	["хотит","хочет"],
	["хочут","хотят"],
	["по-слухам","по слухам"],
	["под-дых","под дых"],
	["пол кило","полкило"],
	["н[еи][ -]*в[ -]*ко[еи]м случа[еи]","ни в коем случае"],
	["во-*скоко","во сколько"],
	["вылазит ","вылезает "],//TODO: аналоги
	["и(?:сч|щ|ш)о","ещё"],
	["лучче","лучше"],
	["жизне","жизни"],
	["седишь","сидишь"],
	["докучи","до кучи"],
	["к[ао]во","кого"],
	["ч[ёо]нить","что-нибудь"],//Как отличить от "чинить", не знаю
	["н[ие]з*ь*зя","низзя"],
	["д[ао]фига","очень много"],//Ибо нефиг!
	["ч[ёое]-*то","что-то"],//TODO: дополнить!
	["ч[еоё]-нить","что-нибудь"],
	//["миня","меня"],//Нелья, речка такая есть!
	["апять","опять"],
	["н[ие][фв]курс[ие]","не в курсе"],
	["зопиши","запиши"],
	["н[ие][ -]над[ао]","не надо"],
	["кто-*нить","кто-нибудь"],//TODO: допросклонять!
	["что-*нить","что-нибудь"],//TODO: допросклонять!
	["нехоц+а","не хочется"],
	["п[ао]любому","по-любому"],
	["наверн[ао]","наверное"],
	["ес[ст]+ес+н[ао]","естественно"],
	["яб","я б"],
	["етими","этими"],//TODO: просклонять, не обидев йети!
	["такойже","такой же"],//TODO: просклонять
	["поидее","по идее"],
	["жалбы","жал бы"],
	["былобы","было бы"],
	["невлезает","не влезает"],
	["что-*ж","что ж"],
	["катац+о","кататься"],
	["када","когда"],
	["скуб","скуп"],
	["в-*зад[еи]","сзади"],
	["с-*зад[еи]","сзади"],
	["з-*зад[еи]","сзади"],
	["на р[ао]вне","наравне"],
	["серебреного","серебряного"],//TODO: просклонять
	["сомной","со мной"],
	["сначало","сначала"],
	["еще","ещё"],
	["ее","её"],
	["кароч","короче"],
	["пороль","пароль"],
	["дрож","дрожь"],
	["жжот","жжёт"],
	["нехочу","не хочу"],
	["молодёж","молодёжь"],
	["полувер","пуловер"],
	["в расплох","врасплох"],
	["продовца","продавца"],
	["всмысле","в смысле"],
	["штол[еь]","что ли"],
	["н[еи]знаю","не знаю"],
	["это-ж","это ж"],
	["падажди","подожди"],
	["во первых","во-первых"],
	["пожалу*ста","пожалуйста"],
//	["безплатно","бесплатно"],
	["досвидание","до свидания"],
	["вс[её]таки","всё-таки"],
	["в кратце","вкратце"],
	["ключь","ключ"],
	["староной","стороной"],
	["немогу","не могу"],
	["в[-]*о+бщем","в общем"],
	["тожэ","тоже"],
	["такжэ","также"],
	["в(?:об|а)ще","вообще"],
//	["пожалста","пожалуйста"],//Объединено
	["скока","сколько"],
	["с[её]дня","сегодня"],
	["патаму","потому"],
	["тада","тогда"],
	["жудко","жутко"],
	["поарать","поорать"],
	["сандали","сандалии"],
	["што","что"],
	["скочать","скачать"],
//	["отзов(?=(?:ы||а|у|ом|ам|ами))","отзыв"],
	["троль","тролль"],
	["придти","прийти"],
	["ложить","класть"],
//	["я ложу","кладу"],//Подойти к ложу / подойти к кладу
	["ложим","кладём"],
	["ложишь","кладёшь"],
	["ложите","кладёте"],
	["лож[ау]т","кладут"],
	["лож[ие]т","кладёт"],
	["светой","святой"],//TODO: склонять
	["немогу","не могу"],
	["ноч","ночь"],
	["вкантакте","вконтакте"],
	["чтото","что-то"],
	["скем","с кем"],
	["смореть","смотреть"],
	["ихн(?:ий|его|ему|им|ем|ее|яя|ей|юю|ие|их|им)","их"],
	["на тощак","натощак"],
	["чтоли","что ли"],
	["сдесь","здесь"],
	["незачто","не за что"],
	["калеса","колеса"],
	["какойт[ао]","какой-то"],//TODO: допросклонять
	["какиет[ао]","какие-то"],
	["какаят[ао]","какая-то"],
	["тоесть","то есть"],
	["подругому","по-другому"],
	["знач[её]к","значок"],
	["в кратце","вкратце"],
	["на последок","напоследок"],
	["помо[ей]му","по-моему"],
	["покласть","положить"],
	["никаго","никого"],
	["кагда","когда"],
	["п[ао]ч[ие]му","почему"],
	["наконецто","наконец-то"],
	["гдебы","где бы"],
	["вс[её]время","всё время"],
	["чуть-*ли","чуть ли"],
	["вря[дт]-*ли","вряд ли"],
	["ка[кг]бу[дт]то","как будто"],
	["в догонку","вдогонку"],
	["экспрес*о","эспрессо"],
	["всмысле","в смысле"],
	["ваще","вообще"],
	["потому-что","потому что"],
	["что-бы","чтобы"],
	["што-бы","чтобы"],
	["видете","видите"],//TODO: проспрягать
	["в догонку","вдогонку"],
	["сп[оа]сиб[оа]","спасибо"],
	["типо","типа"],
	["граммот","грамот"],
	["конешно","конечно"],
	["ключ[её]м","ключом"],
	["недай","не дай"],
	["нович[ёе]к","новичок"],
	["нада","надо"],
	["вс[её]-*равно","всё равно"],
	["тобишь","то бишь"],
	["забеременяю","забеременею"],
	["незавалялся","не завалялся"],
	["неповеришь","не поверишь"],
	["никчему","ни к чему"],
	["щ[ая][сз]*","сейчас"],
	["болкон","балкон"],//TODO: просклонять, не обидев князя Болконского
	["хош","хочешь"],
	["очь*(?!-ч)","очень"],
	["н[ие]разу","ниразу"],
	["завтро","завтра"],
	["гаус","Гаусс"],//TODO: просклонять. В префиксы нельзя, ибо c -> сс
	["из *за","из-за"],
	["из *под","из-под"],
	["металы","металлы"],//TODO: просклонять, помнить про глагол "метал"
	["щелч[её]к","щелчок"],
	["пол[\- ]часа","полчаса"],
	["неначем","не на чем"],
	["весч","вещь"],
	["параноя","паранойя"],//TODO: досклонять
	["паранои","паранойи"],
	["неработает","не работает"],
	["несможешь*","не сможешь"],
	["чему-нить","чему-нибудь"],
	["чтоже","что же"],
	["чтонибу[дт]ь","что-нибудь"],
	["н[ие]люблю","не люблю"],
	["почемуто","почему-то"],
	["по-скорее","поскорее"],
	["накого","на кого"],
	["канеш","конечно"],
	["какую нибудь","какую-нибудь"],//TODO: просклонять
	["редов","рядов"],
	["будеть","будет"],
	["истощенна","истощена"],
	["истощенно","истощено"],
	["истощенны","истощены"],
	["по[ -]*ди[ао]г[ао]нал[еи]","по диагонали"],
	["пребь[ёе]т","прибьёт"],//TODO: проспрягать
	["стери","сотри"],
	["и[зс][- ]*под[- ]*лобья","исподлобья"],
	["по русски","по-русски"],
	["подощло","подошло"],
	["и[зс][ -]*д[ао]л[еи]ка","издалека"],
	["попорядку","по порядку"],
	["молодожённых","молодожён"],//TODO: просклонять
	["неспеша","не спеша"],
];

var orphoPrefixToCorrect=[
/*
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["сь","съ"],//TODO: прочие приставки
	["учон","учён"],
	["удиля","уделя"],
	["избера","избира"],
	["обидить"+sya,"обидеть"],
	["дерать"+sya,"дирать"],
	["тварит"+sya,"творит"],
	["перепех","перепих"],
	["уеден","уедин"],
	["извен","извин"],
	["обворач","оборач"],
	["бъ","бь"],
	["под(?=ск[ао]льз)","по"],
	["назвает","называет"],//5 шт.  на Баше
	["металич","металлич"],
	["пичаль","печаль"],
	["пакров","покров"],
	["отдера","отдира"],//TODO: другие приставки
	["по-файлов","пофайлов"],
	["спичич","спичеч"],
	["дуел","дуэл"],
	["невидем","невидим"],
	["счелч","щелч"],
	["сельне","сильне"],
	["б[ие]бл[ие]о","библио"],
	["бесвязн","бессвязн"],
	["трол(?!л)","тролл"],
	["ощущене","ощущени"],
	["мендал","миндал"],
	["седелок","сиделок"],
	["седелк","сиделк"],
	["женчин","женщин"],
	["из[- ]*под-","из-под "],
	["из[- ]*за-","из-за "],
	["друг-друг","друг друг"],
	["вапрос","вопрос"],
	["спраси","спроси"],
	["ч+[иеа]ст*лив","счастлив"],//TODO: сделать так, чтобы умещалось в одну!
	["щ+[иеа]ст*лив","счастлив"],
	["с[щч]+[иеа]ст*лив","счастлив"],
	["щ+[иеа]ст","счаст"],
	["с[чщ]+[иеа]ст","счаст"],
	["иксплоит","эксплоит"],
	["експлоит","эксплоит"],
	["п[ао]м[ао]г","помог"],
	["крадуц+а","крадутся"],
	["обисн","объясн"],
	["мароз","мороз"],
	["парнух","порнух"],
	["еп+он","япон"],
	["беомехан","биомехан"],
	["мабил","мобил"],
	["жистян","жестян"],
	["осиле(?!н)","осили"],
	["успак","успок"],
	["оронгутан","орангутан"],
	["ар[ао]нгутан","орангутан"],
	["матив","мотив"],
	["пильмен","пельмен"],
	["децтв","детств"],
	["ужос","ужас"],
	["криве[тд]к","креветк"],
	["тегров","тигров"],
	["испепил","испепел"],
	["сдрав*ств","здравств"],
	["здраств","здравств"],
	["собутылочник","собутыльник"],
	["обкута","окута"],
	["хлыш","хлыщ"],
	["ево[шн][а-яё]+","его"],
	["каров","коров"],
	["шпоргал","шпаргал"],
	["атракцион","аттракцион"],
	["режис[ёе]р","режиссёр"],
	["соеденин","соединен"],
	["симпотич","симпатич"],
	["девч[её]н","девчон"],
	["мущин","мужчин"],
	["большенств","большинств"],
	["седени","сидени"],
	["електр","электр"],
	["приемуществ","преимуществ"],
	["оффис","офис"],
	["агенств","агентств"],
	["одн[оа]класник","одноклассник"],
	["однаклассник","одноклассник"],
	["видио","видео"],
	["руск","русск"],
	["сматре","смотре"],
	["расчит","рассчит"],
	["кантакт","контакт"],
	["маструб","мастурб"],
	["серебрянн","серебрян"],
	["правельн","правильн"],
	["балон","баллон"],
	["коментар","комментар"],
	["прийд","прид"],
	["раз*сказ","рассказ"],
	["класн","классн"],
	["аргазм","оргазм"],
	["регестрац","регистрац"],
	["куринн","курин"],
	["востанов","восстанов"],
	["дешов","дешёв"],
	["пр[ие]з[ие]ватив","презерватив"],
	["телифон","телефон"],
	["гдето","где-то"],
	["часн","частн"],
	["расспис","распис"],
	["офицал","официал"],
	["здраств","здравств"],
	["тысеч","тысяч"],
	["жост","жест"],
	["примьер","премьер"],
	["сь[её]м","съём"],
	["правел","правил"],
	["еслиб","если б"],
	["свинн","свин"],
	["разсве","рассве"],
	["росписани","расписани"],
	["гостинниц","гостиниц"],
	["комерч","коммерч"],
	["би[зс]плат","бесплат"],
	["бальш","больш"],
	["что-бы","чтобы"],
	["без(?=[кпстфхцчшщ])","бес"],//TODO: раз/роз
	["бес(?=[бвгджзлмр])","без"],
	["бези","безы"],
//	["безт","бест"],//TODO: доделать
	["не долюбли","недолюбли"],
	["боян","баян"],
	["будующ","будущ"],
	["лутш","лучш"],
	["курсав","курсов"],
	["венчестер","винчестер"],
	["брошур","брошюр"],
	["бе[сз]пелот","беспилот"],
	["вмистим","вместим"],
	["жолуд","жёлуд"],
	["возвро","возвра"],
	["в-*течени[ие]","в течение"],
	["вырощен","выращен"],
	["корект","коррект"],
	["грусн","грустн"],
	["граммот","грамот"],
	["неостановлюсь","не остановлюсь"],
	["пол-(?=[бвгджзкмнпрстфхцчшщ])","пол"],//TODO!
	["третье классник","третьеклассник"],//TODO!
	["организьм","организм"],
	["галав","голов"],
	["ро[сз]сол","рассол"],
	["мылостын","милостын"],
	["сотон","сатан"],
	["школьнец","школьниц"],
	["както","как-то"],
	["во-первых ","во-первых, "],
	["копрал","капрал"],
	["ленност","леност"],
	["лесничн","лестничн"],
	["опазда","опозда"],
	["сохрон","сохран"],
	["умера","умира"],
	["убера","убира"],
	["собера","собира"],
	["разбера","разбира"],
	["погаловн","поголовн"],
	["пиня","пеня"],
	["иссиня ч[еоё]рн","иссиня-чёрн"],
	["Транс+[еи]льван","Трансильван"],
	["коффе","кофе"],
	["влаз[ие]л","влезал"],
	["свян+","свин"],
	["переборш","переборщ"],
	["бутербот","бутерброд"],
	["ч[ие]хотк","чахотк"],
	["привселюдн","прилюдн"],
	["вздыхн","вздохн"],
	["чательн","тщательн"],
	["малчуган","мальчуган"],
	["немнога","немного"],
	["р[ао][зс]д[оа][ёе]т","раздаёт"],
];

var orphoPostfixToCorrect=[
/*	
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["-нть","-нибудь"],
	["нибуть","нибудь"],
	["надеятся","надеяться"],
	["гадатся","гадаться"],
	["печататся","печататься"],
	["готовяться","готовятся"],
	["боиться","боится"],
	["думатся","думаться"],
	["мчиться","мчится"],
	["обидется","обидеться"],
	["ждатся","ждаться"],
	["маятся","маяться"],
	["имется","иметься"],
	["мытся","мыться"],
	["рватся","рваться"],
	["тиратся","тираться"],
	["кусатся","кусаться"],
	["диратся","дираться"],
	["ниматся","ниматься"],
	["ложаться","ложатся"],
	["нравяться","нравятся"],
	["смеятся","смеяться"],
	["сядеться","сядется"],
	["гулятся","гуляться"],
	["глашаться","глашатся"],
	["жаловатся","жаловаться"],
	["пытатся","пытаться"],
	["оватся","оваться"],
	["з[ао]бот[яю]ть*ся","заботятся"],
	["б[ие]ратся","бираться"],
	["плавяться","плавятся"],
	["деруться","дерутся"],
	["хвастатся","хвастаться"],
	["вертиться","вертится"],
	["одется","одеться"],
	["грется","греться"],
	["еватся","еваться"],
	["ыватся","ываться"],
	["зыватся","зываться"],
	["врубатся","врубаться"],
	["гружатся","гружаться"],
	["пользоватся","пользоваться"],
	["стебатся","стебаться"],
	["иватся","иваться"],
	["писатся","писаться"],
	["общатся","общаться"],
	["двигатся","двигаться"],
	["колотся","колоться"],
	["являтся","являться"],
	["режуться","режутся"],
	["встречатся","встречатся"],
	["братся","браться"],
	["начинатся","начинаться"],
	["трахатся","трахаться"],
	["занятся","заняться"],
	["кажеться","кажется"],
	["хочеться","хочется"],
	["ходиш","ходишь"],
	["просяться","просятся"],
	["к[оа]зать*ся","казаться"],
	[" ка","-ка"],
	["видил(?=а|и|о|)(?=с[яь])","видел"],
	["трахац+[оа]","трахаться"],
	["батареик","батареек"],
	["глядывац+[ао]","глядываться"],
	["играц+[оа]","играться"],
	["товарищь","товарищ"],
	["сушняч[её]к","сушнячок"],
	["пишеться","пишется"],
	["щ[еёо]лк[ао][еи]т","щёлкает"],
	["читаец+а","читается"],
	["будеш","будешь"],
	["пользуюца","пользуются"],
	["пытаюц+а","пытаются"],
	["ругаец+о","ругается"],
	["явяться","явятся"],
	["садют","садят"],
	["пускаюц+а","пускаются"],
	["хочеш","хочешь"],
	["следующию","следующую"],
	["борятся","борются"],
	["сыпится","сыпется"],
	["г[ао]в[ао]риш","говоришь"],
	["ються","ются"],
	["ёться","ётся"],
	["аеться","ается"],
	["оеться","оется"],
	["уеться","уется"],
	["яеться","яется"],
	["ееться","еется"],
	["юеться","юется"],
	["-ли"," ли"],
	["-же"," же"],
	["-бы"," бы"],
//	["-что"," что"],//кое-что
	["можеш","можешь"],
	["аеш","аешь"],
	["шся","шься"],
	["гл[аея]диш","глядишь"],
	["сыпатся","сыпаться"],
	["рвуться","рвутся"],
	["изьм","изм"],//TODO: просклонять
	["цыя","ция"],//TODO: просклонять
	["кочать","качать"],//TODO: проспрягать
	["рвуться","рвутся"],
	["пользуеться","пользуется"],
	["пожж[еа]","позже"],
	["кочает","качает"],
	["кочаеть*ся","качается"],
	["алася","алась"],
	["шол","шёл"],
	["смотр[ие]ш","смотришь"],
	["смотрем","смотрим"],//TODO: допроспрягать. И вообще все глаголы-исключения
	["терад","тирад"],
	["цыми","цами"],
];

var orphoFragmentsToCorrect=[
/*
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["ьявл","ъявл"],
	["миллиц","милиц"],
	["протатип","прототип"],
	["[оа]р[еи]нтир","орентир"],
	["расствор","раствор"],
	["балотир","баллотир"],
	["интерис","интерес"],
	["тринир","тренир"],
	["пологают","полагают"],
	["варачива","ворачива"],
	["топчит"+sya,"топчет"],//sya уже включает границу слова
	["пологаеть*"+sya,"полагает"],
	["видитт"+sya,"видеть"],
	["видет"+sya,"видит"],
	["клеет"+sya,"клеит"],
	["клеют"+sya,"клеят"],
	["пялет"+sya,"пялит"],
	["тащет"+sya,"тащит"],
	["бъёт"+sya,"бьёт"],
	["тр[еbz]с[ёе]т"+sya,"трясёт"],//TODO: проспрягать
	["хочит"+sya,"хочет"],
	["зачот","зачёт"],
	["щитин","щетин"],
	["учасн","участн"],
	["разет","розет"],
	["если-*чо","если что"],
	["чуств","чувств"],
	["сикунд","секунд"],
	["лучьш","лучш"],
	["ч[ие]л[оа]в*[еэ]к","человек"],
	["совецк","советск"],
	["инстал(?![лл])","инсталл"],
	["ньч","нч"],
	["ньщ","нщ"],
	["чьн","чн"],
	["щьн","щн"],
	["чьк","чк"],
	["ъи","ы"],
	["ъэ","э"],
	["тендор","тендер"],
	["будующ","будущ"],
	["празн","праздн"],
	["пр[ие]з[ие]дент","президент"],
	["цыкл","цикл"],
	["мед[еи]ц[иы]н","медицин"],
	["интерестн","интересн"],
	["класн","классн"],
	["эксплуот","эксплуоат"],
	["принцып","принцип"],
	["субьект","субъект"],
	["обьект","объект"],
	["мыслем","мыслим"],
	["престег","пристег"],
	["престёг","пристёг"],
	["фармат","формат"],
	["ьед[еи]н","ъедин"],
	["манет","монет"],
	["проблемм","проблем"],
	["пропоган","пропаган"],
	["коблук","каблук"],
	["буит","будет"],
	["хотяб","хотя б"],
	["регестр","регистр"],//Или "реестр", но сочтём это санкциями
	["рецедив","рецидив"],
	["оч[еи]рова","очарова"],
	["ьясн","ъясн"],
	["чорн","чёрн"],
	["авторезир","авторизир"],
	["ил*[еи]м*[еи]нт","элемент"],
	["эл*[еи]м*[еи]нт","элемент"],//TODO: дебажить до "[эи]л*[еи]м*[еи]нт"
	["пробыва","пробова"],
	["бытерброд","бутерброд"],
	["cочельнтик","cочельник"],
	["глядав","глядыв"],
	["брительк","бретельк"],
	["р[еи]к[ао]ш[еи]т","рикошет"],
	["м[ие]н[ие]рал","минерал"],
];

var matyuki=[
];

var yo=[
];