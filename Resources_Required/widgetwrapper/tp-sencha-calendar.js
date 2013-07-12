datepicker = {

	datePicker: null,

    /**
     *  widgetModel : id, containerWeight,margins, paddings, contentAlignment
     *
     *
     */
    initializeWidget : function(parentNode, widgetModel)
    {
        var calTextbox = '<input type="text" id="'+widgetModel['id']+'" style="border:1px solid #0000FF; width:100%;font-family:Arial;font-size:1.5em;color:red" value="Select Date">';
        parentNode.innerHTML = calTextbox;
		
		widgetModel["date"] = null;

		var calTextbox = document.getElementById(widgetModel['id']);

		datepicker.datePicker = new Ext.DatePicker({useTitles:true});
			
		datepicker.datePicker.on('change', function(me, date) {
			var dt = date.getDate(); dt = (dt<10) ? '0'+dt : dt;
			var mth = date.getMonth() + 1; mth = (mth<10) ? '0'+mth : mth;
			var viewDateStr = dt + '/' + mth + '/' + date.getFullYear();
			datepicker.modelChange(widgetModel, "date", viewDateStr);
		});
			datepicker.datePicker.show();
        calTextbox.onfocus = function(e) { this.blur();
			datepicker.datePicker.show();
		};
    },

    modelChange : function(widgetModel, propertyChanged, propertyValue)
    {
		if (propertyChanged === "date")
		{
			widgetModel["date"] = propertyValue;

			var calTextbox = document.getElementById(widgetModel['id']);

			var dateArr = propertyValue.split('/');
			var dt = parseInt(dateArr[0], 10); dt = (dt<10) ? '0'+dt : dt;
			var mth = parseInt(dateArr[1], 10); mth = (mth<10) ? '0'+mth : mth;
			var yr = parseInt(dateArr[2], 10);
			var viewDateStr = dt + '/' + mth + '/' + yr;

			calTextbox.value = viewDateStr;

		}
    }
	

    
}
