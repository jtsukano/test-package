'use babel';

import { CompositeDisposable } from 'atom';
import request from 'request'

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-package:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      this.download(selection)
    }
  },

  download(url) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    })
  }
};
