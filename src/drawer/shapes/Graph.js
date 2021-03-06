const Drawer = require('./Drawer');
const Shadow = require('../component/Shadow');

function Graph({layer, closePath, color, shadow}) {
	this.layer = layer;
    this.drawer = new Drawer(this, this.layer.getBoard().getContext());
	this.methods = [];
	this._hide_methods = [];
	this.closePath = closePath;

	this.color = color;
	this.shadow = shadow || new Shadow(0, '#000', 0, 0);

    this.layer.push(this);
}
//清除所有画板元素，清除后使用refresh不能重新渲染
Graph.prototype.clear = function() {
	this.methods = [];
};
//调用当前元素的记录方法，重新绘制图形
Graph.prototype.refresh = function() {
	var self = this;
	this.methods.forEach(function(value) {
		self[value]();
		self.methods.pop();
	});
};
Graph.prototype.show = function() {
	if(this._hide_methods.length == 0) {return;}
	this._hide_methods = this.methods;
	this.methods = [];
};
Graph.prototype.hide = function() {
	if(this.methods.length == 0) {return;}
	this.methods = this._hide_methods;
	this._hide_methods = [];
};
Graph.prototype.push = function(method) {
	this.methods.push(method);
};
Graph.prototype.getLayer = function() {
    return this.layer;
};

module.exports = Graph;