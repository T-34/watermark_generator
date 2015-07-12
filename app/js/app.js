var formApp = (function(){

	 // menuButton = $('.menu-button'),
	var	formFile = $('.settings__form-file'),
		runner = $('.settings__runner'),
		_addEventListeners = function() {
			formFile.on('change', _changeFileLabel);
			formFile.on('change', _viewImg);
			runner.slider({min:0, max:100, range:'min'});				
		}
// Изменение лейбла при выборе файла
	var _changeFileLabel = function(){
		var	$this = $(this),
			fileValue = $this.val(),
			fileLabel = $(this).parent().find('.settings__form-file-label');
		fileLabel.text(fileValue);		
	};

	var _checkFormat = function(file) {
		var mymeType = ['image/gif', 'image/jpeg', 'image/png', 'image/vnd.wap.wbmp', 'image/pjpeg', 'image/svg+xml', 'image/tiff', 'image/vnd.microsoft.icon'],
			i = 0,
			mymeTypeLength = mymeType.length,
			trueFormat = false;
		for (i, mymeTypeLength; i < mymeTypeLength; i++){
			console.log('Формат' + file.type);
			console.log('тип' + mymeType[i]);
			if  (file.type == mymeType[i]){
				trueFormat = true;
				break;
			}
		}
		if (!trueFormat){
			alert('Не тот формат!');
			return false;
		}
		else {
			return true;
		}

	}

	var _viewImg = function(e) {
		var $this = $(this),
			file = $this[0].files[0];
			sourceContainer = $('.image-container__main-image'),
			watermarkContainer = $('.image-container__watermark'),
			img = document.createElement('img'),
			reader = new FileReader();
			console.log (file);

		if (!_checkFormat(file)){
			alert('Сука!')
			return false;
		}

		
			
		reader.onload = function(event){
			var dataUri = event.target.result;
			img.src = dataUri;
			if ($this.attr('name') == 'source-image') {
				if (!sourceContainer.children().is('img')){ 
					sourceContainer.append(img);
				}
				else{
					sourceContainer.find('img').attr('src', dataUri) 
				}	
			}
			else if ($this.attr('name') == 'watermark-image'){
				if (!watermarkContainer.children().is('img')){ 
					watermarkContainer.append(img);
				}
				else{
					watermarkContainer.find('img').attr('src', dataUri) 
				}
			}
		}
		
		reader.onerror = function(){
			alert('Файл не может быть прочитан!' + event.target.error.code);
		};
		reader.readAsDataURL(file);
	}	

	return {
		init: function() {
			_addEventListeners();
		}
	}
})();