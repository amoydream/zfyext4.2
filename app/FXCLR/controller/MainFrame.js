/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('FXCLR.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function() {
        this.timeLimit();
        this.control({
            '#fxclr_yhrz_btn': {
                toggle: this.onBtnToggle("FXCLR.view.YHRZView"),
                boxready: this.onInitMainView
            }
        });
    },

    onInitMainView: function(obj, width, height, eOpts){
        obj.toggle(true);
    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("fxclr_center");
        centerPanel.removeAll(false);


        if('undefined' == typeof (this.pages[name]))
        {
            //L(name);
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
    },

    onBtnToggle: function(moduleName) {
        return function(obj, pressed, eOpts){
            if(true == pressed)
                this.switchPanel(moduleName);
        }
    },
    timeLimit: function () {
        Ext.apply(Ext.form.VTypes, {
            daterange: function (val, field) {
                if (field.fromDateId) {
                    if (Ext.getCmp(field.fromDateId).rawValue > val) {
                        return false;
                    }
                }
                ;
                if (field.toDateId) {
                    if (Ext.getCmp(field.toDateId).rawValue < val) {
                        return false;
                    }
                }
                ;
                return true;
            },
            daterangeText: '开始时间不能大于结束时间'
        });
    }
});