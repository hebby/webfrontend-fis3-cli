define(['vue'], function(Vue) {
    Vue.component('condition', {
        template: '<div>\n <input v-model="filterText"/>\n </div>',
        props: ['filterText']
    });

    Vue.component('list', {
        template: '<div> <ul class="fl-list"><li v-for="item in items">{{item}} </li> </ul> </div>',
        props: ['items']
    })

    Vue.component('filter-list', {
        template: __inline('filter.html'),
        data: function () {
            return {
                filterText: '',
                items: ['四川省', '河北省', '贵州省', '山西省', '云南省', '辽宁省', '陕西省', '吉林省', '甘肃省', '广东省']
            }
        },
        computed: {
            filteredItems: function () {
                return this.$data.items.filter(function (item) {
                    return item.indexOf(this.$data.filterText) != -1;
                }.bind(this));
            }
        }
    });
});