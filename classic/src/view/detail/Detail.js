/**
 * Shows the details of a particular feed.
 */
Ext.define('FeedViewer.view.detail.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'feeddetail',
    controller: 'feeddetail',

    requires : [
        'Ext.button.Cycle',
        'Ext.app.ViewModel',
        'Ext.toolbar.Toolbar'
    ],

    layout: 'border',
    iconCls: 'x-fa fa-rss',

    tabConfig: {
        cls: 'tab-feed-details'
    },

    bind: {
        title: '{main.currentFeed.title:or("Loading...")}'
    },

    defaults: {
        border: false
    },

    items:[{
        xtype: 'feedposts',
        region: 'center',
        reference: 'feedPosts',
        bind: {
            store: '{main.currentFeed.entries}'
        },
        minHeight: 200,
        minWidth: 200,
        split: true,

        // The feedGrid fires this view event when the cycle button changes state.
        listeners: {
            cycleregion: 'onCycleRegion'
        }
    },
    {
        xtype: 'feedpost',
        reference: 'feedPost',
        split: true,
        bind: {
            rssItem: '{feedPosts.selection}'
        },

        // Keep the cycle button in sync with the region/hidden state.
        listeners: {
            changeregion: 'syncRegionCycler',
            hide: 'syncRegionCycler',
            show: 'syncRegionCycler',
            boxready: 'syncRegionCycler',
            buffer: 10
        },

        responsiveConfig: {
             tall: {
                 region: 'south',
                 height: '50%',
                 width: null,
                 minHeight: 200
             },

             wide: {
                 region: 'east',
                 width: '50%',
                 height: null,
                 minHeight: null,
                 minWidth: 200
             }
        }
    }]
});
