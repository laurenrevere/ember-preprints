import { moduleFor, test } from 'ember-qunit';

moduleFor('route:provider/discover', 'Unit | Route | provider/discover', {
  // Specify the other units that are required for this test.
    needs: [
        'controller:submit',
        'route:discover',
        'service:metrics',
        'service:theme'
    ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
