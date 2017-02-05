// document.addEventListener('DOMContentLoaded', function(){

// });
chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;

    ocpu.seturl("http://104.196.223.110/ocpu/library/NewsComp/R");
    
    var req = ocpu.call("getResults", {
        "url" : url
    }, function(session){
        session.getObject(function(data){
        	// Order: libertarian green liberal conservative anger joy fear sadness surprise
        	console.log(data);
        	$("#curr .graph.first").html(createPoliticalIdeologyGraph(data[3], data[4],data[5],data[6]));
        	$("#curr .graph.second").html(createEmotionGraph(data[7], data[8],data[9],data[10], data[11]));

        	$("#nyt .link-container").replaceWith(createRelatedLink(data[13], data[14]));
        	$("#nyt .graph.first").html(createPoliticalIdeologyGraph(data[15], data[16],data[17],data[18]));
        	$("#nyt .graph.second").html(createEmotionGraph(data[19], data[20],data[21], data[22], data[23]));

        	$("#cnn .link-container").replaceWith(createRelatedLink(data[25], data[26]));
        	$("#cnn .graph.first").html(createPoliticalIdeologyGraph(data[27], data[28],data[29],data[30]));
        	$("#cnn .graph.second").html(createEmotionGraph(data[31], data[32],data[33], data[34], data[35]));

        	$("#foxnews .link-container").replaceWith(createRelatedLink(data[37], data[38]));
        	$("#foxnews .graph.first").html(createPoliticalIdeologyGraph(data[39], data[40],data[41],data[42]));
        	$("#foxnews .graph.second").html(createEmotionGraph(data[43], data[44],data[45], data[46], data[47]));

        	$("#breitbart .link-container").replaceWith(createRelatedLink(data[49], data[50]));
        	$("#breitbart .graph.first").html(createPoliticalIdeologyGraph(data[51], data[52],data[53],data[54]));
        	$("#breitbart .graph.second").html(createEmotionGraph(data[55], data[56],data[57], data[58], data[59]));

        	$("#politico .link-container").replaceWith(createRelatedLink(data[61], data[62]));
        	$("#politico .graph.first").html(createPoliticalIdeologyGraph(data[63], data[64],data[65],data[66]));
        	$("#politico .graph.second").html(createEmotionGraph(data[67], data[68],data[69],data[70], data[71]));

        	$("#wp .link-container").replaceWith(createRelatedLink(data[73], data[74]));
        	$("#wp .graph.first").html(createPoliticalIdeologyGraph(data[75], data[76],data[77],data[78]));
        	$("#wp .graph.second").html(createEmotionGraph(data[79], data[80],data[81],data[82], data[83]));
        });
    });

    req.fail(function(){
    	console.log("Server error: " + req.responseText);
    });

    // $("#breitbart .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));
    // $("#cnn .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));
    // $("#foxnews .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));
    // $("#nyt .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));
    // $("#politico .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));
    // $("#wp .link-container").replaceWith(createRelatedLink("#", "Welcome to the Jungle"));

    // $("#curr .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#breitbart .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#cnn .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#foxnews .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#nyt .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#politico .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));
    // $("#wp .graph.first").html(createPoliticalIdeologyGraph(25,25,25,25));

    // $("#curr .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#breitbart .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#cnn .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#foxnews .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#nyt .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#politico .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));
    // $("#wp .graph.second").html(createEmotionGraph(20, 20, 20, 20, 20));

});

function createRelatedLink(link, title) {
	var html = '<div class="link-container" tooltip="'
	html += title;
	html += '"><a tabindex="-1" target="_blank" href="';
	html += link;
	html += '" class="button-link">Source</a></div>'
	return html;
}

function createPoliticalIdeologyGraph(libertarian, green, liberal, conservative) {
	liberal = Math.round(liberal * 100);
	green = Math.round(green * 100);
	libertarian = Math.round(libertarian * 100);
	conservative = 100 - liberal - green - libertarian;
	var html = '<div class="stacked-bar-graph" tooltip="Liberal: ';
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
	html += '%" class="bar-conservative"></span><p>Political Ideology</p></div>';
	return html;
}

function createEmotionGraph(anger, joy, fear, sadness, surprise) {
	anger = Math.round(anger * 100);
	fear = Math.round(fear * 100);
	joy = Math.round(joy * 100);
	sadness = Math.round(sadness * 100);
	surprise = 100 - anger - fear - joy - sadness;
	var html = '<div class="stacked-bar-graph" tooltip="Anger: ';
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
	html += '%" class="bar-surprise"></span><p>Emotion</p></div>';
	return html;
}
