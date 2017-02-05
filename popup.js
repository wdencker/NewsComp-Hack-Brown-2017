// document.addEventListener('DOMContentLoaded', function(){

// });
chrome.tabs.getSelected(null, function(tab) {
    // var url = tab.url;
    
    $("#curr").append('<div class="link-container"></div>');
    $("#breitbart").append(createRelatedLink("#", "Welcome to the Jungle"));
    $("#cnn").append(createRelatedLink("#", "Welcome to the Jungle"));
    $("#foxnews").append(createRelatedLink("#", "Welcome to the Jungle"));
    $("#nyt").append(createRelatedLink("#", "Welcome to the Jungle"));
    $("#politico").append(createRelatedLink("#", "Welcome to the Jungle"));
    $("#wp").append(createRelatedLink("#", "Welcome to the Jungle"));

    $("#curr").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#breitbart").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#cnn").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#foxnews").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#nyt").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#politico").append(createPoliticalIdeologyGraph(35,25,10,30));
    $("#wp").append(createPoliticalIdeologyGraph(35,25,10,30));

    $("#curr").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#breitbart").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#cnn").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#foxnews").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#nyt").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#politico").append(createEmotionGraph(20, 10, 30, 15, 25));
    $("#wp").append(createEmotionGraph(20, 10, 30, 15, 25));

});

function createRelatedLink(link, title) {
	var html = '<div class="link-container" tooltip="'
	html += title;
	html += '"><a tabindex="-1" target="_blank" href="';
	html += link;
	html += '" class="button-link">Source</a></div>'
	return html;
}

function createPoliticalIdeologyGraph(liberal, green, libertarian, conservative) {
	liberal = Math.round(liberal);
	green = Math.round(green);
	libertarian = Math.round(libertarian);
	conservative = Math.round(conservative);
	var html = '<div class="graph"><div class="stacked-bar-graph" tooltip="Liberal: ';
	html += String(liberal);
	html += "% Green: ";
	html += String(green);
	html += "% Libertarian: ";
	html += String(libertarian);
	html += "% Conservative: ";
	html += String(conservative);
	html += '%" tooltip-graph>';
	html += '<span style="width:';
	html += String(liberal);
	html += '%" class="bar-liberal"></span><span style="width:';
	html += String(green);
	html += '%" class="bar-green"></span><span style="width:';
	html += String(libertarian);
	html += '%" class="bar-libertarian"></span><span style="width:';
	html += String(conservative);
	html += '%" class="bar-conservative"></span><p>Political Ideology</p></div></div>';
	return html;
}

function createEmotionGraph(anger, fear, joy, sadness, surprise) {
	anger = Math.round(anger);
	fear = Math.round(fear);
	joy = Math.round(joy);
	sadness = Math.round(sadness);
	surprise = Math.round(surprise);
	var html = '<div class="graph"><div class="stacked-bar-graph" tooltip="Anger: ';
	html += String(anger);
	html += "% Fear: ";
	html += String(fear);
	html += "% Joy: ";
	html += String(joy);
	html += "% Sadness: ";
	html += String(sadness);
	html += "% Surprise: ";
	html += String(surprise);
	html += '%" tooltip-graph>';
	html += '<span style="width:';
	html += String(anger);
	html += '%" class="bar-anger"></span><span style="width:';
	html += String(fear);
	html += '%" class="bar-fear"></span><span style="width:';
	html += String(joy);
	html += '%" class="bar-joy"></span><span style="width:';
	html += String(sadness);
	html += '%" class="bar-sadness"></span><span style="width:';
	html += String(surprise);
	html += '%" class="bar-surprise"></span><p>Emotion</p></div></div>';
	return html;
}
