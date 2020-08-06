

function loadCSVDataFromFile(){
	console.log(rawData);
	
	var result = $.csv.toObjects(rawData,{
					  // separator
					  separator:',',
					  // shows headers
					  headers:true

					});
	console.log(result);
	result.sort(function(a, b) {	if (a.id < b.id ) return -1;
									if (a.id > b.id ) return 1;
									return 0;
									});
	var dataMap = buildDataMap(result);
	console.log(dataMap);
	return dataMap;
}
//indexing data using id
function buildDataMap(objectList){
	console.log(objectList);
	var dataMap =  new Map();

	for(let index in objectList){
		if (objectList[index] !== undefined && objectList[index] !== null) {
			objectList[index].children = [];
			if (objectList[index].link !== undefined && objectList[index].link !== null) {
				if(dataMap.has(objectList[index].link)){
					var upper =  dataMap.get(objectList[index].link);
					upper.children.push(objectList[index]);
					dataMap.set(objectList[index].link,upper);
				}else {
					dataMap.set(objectList[index].id,objectList[index]);
				}
				
			}
		}
	}
	return dataMap;
}
function buildCollapsibleList(dataMap){
	var root = document.createElement('ul');
	root.id = 'rootList';
	for (let key of dataMap.keys()) {
		var object = dataMap.get(key);
		root.appendChild(buildNode(object));
	}
	return root;
}
function buildNode(nodeData){
	var node; 
	if(nodeData.children === undefined || nodeData.children === null || nodeData.children.length == 0){
		node = document.createElement('li');
		node.innerHTML = buildDisplayString(nodeData);
	}else{
		node = document.createElement('li');
		var content = document.createElement('span');
		content.className = 'caret';
		content.innerHTML  = buildDisplayString(nodeData);
		content.onclick = function () {
				this.parentElement.querySelector(".nested").classList.toggle("active");
				this.classList.toggle("caret-down");
			};
		node.appendChild(content);
		var subList = document.createElement('ul');
		subList.className = 'nested';
		for(let obj in nodeData.children){
			subList.appendChild(buildNode(nodeData.children[obj]));
		}
		node.appendChild(subList);
	}
	return node;
}
function buildDisplayString(nodeData){
	var str = "";
	str += nodeData.id;
	if(nodeData.gender !== undefined && nodeData.gender !== null){
		if(nodeData.gender.trim().toUpperCase() == 'M'){
			str += m_icon;
		}else if(nodeData.gender.trim().toUpperCase() == 'F'){
			str += f_icon;
		}else{
			str += " Unknown";
		}
	}
	if(nodeData.age !== undefined && nodeData.age !== null){
		str += " " + nodeData.age;
	}else{
		str += "    ";
	}
	if(nodeData.dateIn !== undefined && nodeData.dateIn !== null){
		str += " IN: " + nodeData.dateIn;
	}
	return str;
}
