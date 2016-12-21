import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:submit', 'Unit | Controller | submit', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
    needs: [
        'validator:presence',
        'validator:length',
        'validator:format',
        'service:metrics'
    ],
test('editLicense sets basicsLicense and licenseValid', function(assert) {
    const ctrl = this.subject();
    assert.equal(ctrl.get('basicsLicense.copyrightHolders'), null);
    assert.equal(ctrl.get('basicsLicense.licenseType'), null);
    assert.equal(ctrl.get('basicsLicense.year'), null);
    assert.equal(ctrl.get('licenseValid'), false);
    // Trigger controller action
    ctrl.send('editLicense', 'license', true);

    assert.equal(ctrl.get('basicsLicense'), 'license');
    assert.equal(ctrl.get('licenseValid'), true);
});

test('applyLicenseToggle toggles applyLicense', function(assert) {
    const ctrl = this.subject();
    assert.equal(ctrl.get('applyLicense'), false);
    ctrl.send('applyLicenseToggle', true);
    assert.equal(ctrl.get('applyLicense'), true);
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
