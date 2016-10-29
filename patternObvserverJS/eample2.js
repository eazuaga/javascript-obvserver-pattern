
//class obvserver
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};

//class subject

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};


//implementation
// Extend an object with an extension
function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}


var t1 = document.getElementById("text1"),
  t2 = document.getElementById("text2");

function myEventHandler(e) {
    console.log(e);
    console.log(e.target.value);
    e.target.notify(e.target.value);
}

// Extend the controlling checkbox with the Subject class
extend(t1, new Subject());

// Clicking the checkbox will trigger notifications to its observers

t1.addEventListener("keyup", myEventHandler, false);
//controlCheckbox.onclick = function () {
//    controlCheckbox.notify(controlCheckbox.checked);
//};


extend(t2, new ObserverList())
// Override with custom update behaviour
t2.update = function (value) {
    this.value = value;
};
t1.addObserver(t2);






