var words = []; 
isDictionaryWord.dict = {};
$.ajax({
    url: "graphics_data/dictionary.txt",
    success: function(result) {
        console.log("booting up dict"); 
      words = result.split("\n");
      for (var i = 0; i < words.length; ++i) {
        isDictionaryWord.dict[words[i].toUpperCase()] = true;
        words[i] = words[i].toUpperCase(); 
      }

      console.log(words[30]); 
    }
  });
