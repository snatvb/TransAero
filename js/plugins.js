;(function(){
    var SNSlider = function(selector, stgs){
        this.stgs = stgs || {};
        this.selector = selector;
        this.init();
    };

    SNSlider.prototype = {
        init: function(){
            this.startID = 0;
            this.id = 0;
            this.container = $(this.selector);
            if(this.container.length <= 0) return;
            this.getStgs();
            this.collectElms();
            this.maxID = this.elems.slides.length - 1;
            this.listen();
            this.autoPlay();
        },
        getStgs: function(){
            this.stgs.btn = this.stgs.btn || {};
            this.stgs = {
                btn: {
                    left: this.stgs.btn.left || '.c-btn-left',
                    right: this.stgs.btn.left || '.c-btn-right'
                },
                delay: this.stgs.delay || 2000,
                autoPlay: this.stgs.autoPlay || true,
                slides: this.stgs.slides || '.c-slide',
                active: this.stgs.active || 'active'
            }
        },
        collectElms: function(){
            this.elems = {
                btn: {
                    left: this.container.find(this.stgs.btn.left),
                    right: this.container.find(this.stgs.btn.right)
                },
                slides: this.container.find(this.stgs.slides)
            };
        },
        goLeft: function(){
            this.id++;
            if(this.id > this.maxID) this.id = 0;
            this.update();
        },
        goRight: function(){
            this.id--;
            if(this.id < 0) this.id = this.maxID;
            this.update();
        },
        update: function(){
            this.elems.slides.removeClass(this.stgs.active);
            this.elems.slides.eq(this.id).addClass(this.stgs.active);
        },
        listen: function(){
            var self = this;
            this.elems.btn.left.on('click', function(event){
                self.goLeft();
                event.preventDefault();
            });
            this.elems.btn.right.on('click', function(event){
                event.preventDefault();
                self.goRight();
            });
        },
        autoPlay: function(){
            if(!this.stgs.autoPlay) return false;
            var self = this;
            this.timer = setInterval(function(){
                self.goLeft()
            }, self.stgs.delay);
        }
    };
    window.SNSlider = SNSlider;
})();