PasswordStrength = {
	passwordBox: null,
    initializeWidget: function(parentNode, widgetModel)
    {
        var html = '<div style="margin-top:10px;">';
		html += '<div id="psContainer" style="height:20px; xwidth:100px; border:1px solid #000000; margin-top:5px;"><div id="psStrength" style="height:18px; width:0px;"></div></div>';
		html += '</div>';
        parentNode.innerHTML = html;
		
		PasswordStrength.passwordBox = document.getElementById('frmhome_txtBoxPwd');
		
		PasswordStrength.passwordBox.addEventListener('keyup', function(e) {
			PasswordStrength.updateStrength(this.value);
		});

		//
    },

    modelChange: function(widgetModel, propertyChanged, propertyValue)
    {
		widgetModel[propertyChanged] = propertyValue;
		PasswordStrength.updateStrength(this.value);
    },
	
	updateStrength: function(pw) {
		var strength = PasswordStrength.getStrength(pw);
		var psStrength = document.getElementById('psStrength');
		if(strength < 16) {
			psStrength.style.backgroundColor = '#CC0000';
		} else if(strength >= 16 && strength <= 28) {
			psStrength.style.backgroundColor = '#FF6600';
		} else {
			psStrength.style.backgroundColor = '#009900';
		}
		var width = (document.getElementById('psContainer').offsetWidth/32)*strength;
		new Effect.Morph('psStrength', {style:'width:'+width+'px', duration:'0.4'});
	},
	
	getStrength: function(passwd) {
		intScore = 0;
		if (passwd.match(/[a-z]/)) // [verified] at least one lower case letter
		{
			intScore = (intScore+1);
		}
		if (passwd.match(/[A-Z]/)) // [verified] at least one upper case letter
		{
			intScore = (intScore+5);
		}
		// NUMBERS
		if (passwd.match(/\d+/)) // [verified] at least one number
		{
			intScore = (intScore+5);
		}
		if (passwd.match(/(\d.*\d.*\d)/)) // [verified] at least three numbers
		{
			intScore = (intScore+5);
		}
		// SPECIAL CHAR
		if (passwd.match(/[!,@#$%^&*?_~]/)) // [verified] at least one special character
		{
			intScore = (intScore+5);
		}
		if (passwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) // [verified] at least two special characters
		{
			intScore = (intScore+5);
		}
		// COMBOS
		if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/)) // [verified] both upper and lower case
		{
			intScore = (intScore+2);
		}
		if (passwd.match(/\d/) && passwd.match(/\D/)) // [verified] both letters and numbers
		{
			intScore = (intScore+2);
		}
		// [Verified] Upper Letters, Lower Letters, numbers and special characters
		if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/) && passwd.match(/\d/) && passwd.match(/[!,@#$%^&*?_~]/))
		{
			intScore = (intScore+2);
		}
		return intScore;
	}
};