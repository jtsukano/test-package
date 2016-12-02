'use babel';

import TestPackageView from './test-package-view';
import { CompositeDisposable } from 'atom';

export default {

  testPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testPackageView = new TestPackageView(state.testPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testPackageView.destroy();
  },

  serialize() {
    return {
      testPackageViewState: this.testPackageView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
    console.log('TestPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
