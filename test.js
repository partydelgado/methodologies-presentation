<script type="text/javascript">
  describe("views.Slide", function(){
    'use strict';
    
    beforeEach(function(){
      spyOn($w, 'publish');
    });
    
    describe('Navigation', function(){
  
      describe('when previous arrow is clicked', function(){
        it('notifies app to move current slideshow to previous slide', function(){
  
          var prev = view.$el.children('.prev-arrow');
  
          prev.trigger('click');
          expect($w.publish).toHaveBeenCalledWith('app.prevSlide');
        });
      });
      
    });
  
  });
  
  
  describe('when "app.prevSlide" event fires', function(){
    beforeEach(function(){
      spyOn($w,'publish').andCallThrough();
      window.app.analytics.currentPage = {title: 'test breadcrumb'};
      window.app.slideshowView = {
        model: {
          previousSlide: function(){},
          getCurrentSlide:function(){
            return 1;
          }
        }
      };
    });
  
    it('refreshes ads', function(){
      $w.publish('app.prevSlide');
  
      expect($w.publish).toHaveBeenCalledWith('ads.refresh');
    });
  
    it('sends a GA event', function(){
      $w.publish('app.prevSlide');
      
      expect($w.publish).toHaveBeenCalledWith('analytics.slidePageView', [window.app.slideshowView.model.getCurrentSlide()]);
    });
  });
</script>