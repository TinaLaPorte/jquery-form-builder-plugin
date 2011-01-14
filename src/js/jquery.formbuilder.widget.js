/*
 * Base widget plugin of JQuery Form Builder plugin, all Form Builder widgets should extend from this plugin. 
 * 
 * Revision: @REVISION
 * Version: @VERSION
 * Copyright 2011 Lim Chee Kin (limcheekin@vobject.com)
 *
 * Licensed under Apache v2.0 http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * Date: 
 */

var FbWidget = {
  options: { // default options. values are stored in widget's prototype
	  option1: "FbWidget.optionValue",
	  _styleClass: "ctrlHolder"
    },
  // _logging to the firebug's console, put in 1 line so it can be removed easily for production
  _log: function($message) { if (window.console && window.console.log) window.console.log($message); },
	_create: function() {
	  this._log('FbWidget._create called. this.options.option1 = ' + this.options.option1);
	  this.element.click(this.createWidget);
    },
  _init: function() {
    this._log('FbWidget._init called.');
    },        
	destroy: function() {
	  this._log('FbWidget.destroy called.');
	  this.element.button('destroy');

	  // call the base destroy function.
		$.Widget.prototype.destroy.call(this);

    },
  createField: function(name, widget, options, settings) {
	  var formBuilderOptions = $.fb.formbuilder.prototype.options;
	  var index = $('#builderForm div.ctrlHolder').size();
	  
	  $('<a class="ui-corner-all closeButton" href="#"><span class="ui-icon ui-icon-close">delete this widget</span></a>')
	  .prependTo(widget).click($.fb.fbWidget.prototype._deleteWidget);
	  widget.attr('rel', index);
	  widget.append($.fb.fbWidget.prototype._createFieldProperties(name, options, settings, index));
	  
	  $(formBuilderOptions._emptyBuilderPanel + ':visible').hide();
	  $(formBuilderOptions._builderForm).append(widget).sortable('refresh');
    }, 
  propertyName: function (value) {
  	var propertyName;
  	propertyName = value.replace(/ /gi,'');
  	propertyName = propertyName.charAt(0).toLowerCase() + propertyName.substring(1);
  	return propertyName;
  	},    
  _deleteWidget: function(event) {
	   var $widget = $(event.target).parent().parent();
	   var index = $widget.attr('rel');
	   var $ctrlHolders = $('#builderForm div.ctrlHolder');
	   var size = $ctrlHolders.size();
	   $widget.find("input[id$='fields[" + index + "].status']").val('D');
	   $widget.hide();
	   event.stopPropagation();
  },
	_createFieldProperties: function(name, options, settings, index) {
		// alert('name = ' + name + ', options.type = '+ options.type);
		var $fieldProperties = $('<div class="fieldProperties"> \
		<input type="hidden" id="fields[' + index + '].name" name="fields[' + index + '].name" value="' + name + '" /> \
		<input type="hidden" id="fields[' + index + '].type" name="fields[' + index + '].type" value="' + options.type + '" /> \
		<input type="hidden" id="fields[' + index + '].settings" name="fields[' + index + '].settings" /> \
		<input type="hidden" id="fields[' + index + '].sequence" name="fields[' + index + '].sequence" value="' + index + '" /> \
		<input type="hidden" id="fields[' + index + '].status" name="fields[' + index + '].status" /> \
		</div>');
		$fieldProperties.find("input[id$='fields[" + index + "].settings']").val($.toJSON(settings));
		return $fieldProperties;
    },        
  _updateStatus: function(event) {
	  $widget = $(event.target);
	  $.fb.fbWidget.prototype._log($widget.attr('id') + " updated");
	  $widget.parent().find('input:last').val('U');
  },
	createWidget: function(event) { alert('createWidget(event) should be overriden by subclass'); }
};

$.widget('fb.fbWidget', FbWidget);