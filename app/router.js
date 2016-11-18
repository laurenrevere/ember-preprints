import Ember from 'ember';
import config from 'ember-get-config';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL,
    metrics: Ember.inject.service(),

    didTransition() {
        this._super(...arguments);
        this._trackPage();
    },

    _trackPage() {
        Ember.run.scheduleOnce('afterRender', this, () => {
            const page = document.location.pathname;
            const title = this.getWithDefault('currentRouteName', 'unknown');

            Ember.get(this, 'metrics').trackPage({ page, title });
        });
    }
});

Router.map(function() {
    const {hostname} = window.location;

    const isProviderDomain = config
        .PREPRINTS
        .providers
        .some(provider => hostname.includes(provider.domain));

    this.route('page-not-found', {path: '/*bad_url'});

    if (isProviderDomain) {
        this.route('index');
        this.route('submit');
        this.route('discover');
        this.route('page-not-found');
    } else {
        this.route('index', {path: 'preprints'});
        this.route('submit', {path: 'preprints/submit'});
        this.route('discover', {path: 'preprints/discover'});
        this.route('provider', {path: 'preprints/:slug'}, function () {
            this.route('content', {path: '/:preprint_id'});
            this.route('discover');
            this.route('submit');
        });
        this.route('page-not-found', {path: 'preprints/page-not-found'});
    }

    this.route('content', {path: '/:preprint_id'});
    this.route('forbidden');
});

export default Router;
