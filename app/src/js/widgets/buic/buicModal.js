/**
 * @param {Object} $ - Global jQuery object
 */
(function ($) {
    'use strict';

    /**
     * BUIC modal widget.
     *
     * @license http://opensource.org/licenses/mit-license.php MIT License
     * @author rarila
     *
     * @class buicModal
     * @memberOf jQuery.widget.bolt
     */
    $.widget('bolt.buicModal', /** @lends jQuery.widget.bolt.buicModal.prototype */ {
        /**
         * Default options.
         *
         * @property {boolean}       [small=false]  - Create a small dialog
         * @property {boolean}       [large=false]  - Create a large dialog
         * @property {boolean}       [closer=false] - Add a close button
         * @property {Object|string} [headline]     - Add a headline
         * @property {Object|string} [body]         - Add a body
         * @property {Object|string} [footer]       - Add a footer
         * @property {Object|string} [content]      - Add a content
         */
        options: {
            small:    false,
            large:    false,
            closer:   false,
            headline: '',
            body:     '',
            footer:   '',
            content:   ''
        },

        /**
         * The constructor of the modal widget.
         *
         * @private
         */
        _create: function () {
            var self = this;

            /**
             * Refs to UI elements of this widget.
             *
             * @type {Object}
             * @name _ui
             * @memberOf jQuery.widget.bolt.fieldSlug.prototype
             * @private
             *
             * @property {Object} content  - Content element of the modal.
             * @property {Object} modal    - The modal.
             */
            this._ui = {
                content:  null,
                modal:    null
            };

            // Setup UI elements.
            self._ui.content = $('<div/>')
                .addClass('modal-content');

            self._ui.modal =
                $('<div/>')
                    .attr('tabindex', -1)
                    .attr('role', 'dialog')
                    .addClass('buic-modal modal fade')
                    .append(
                        $('<div/>')
                            .addClass('modal-dialog modal-lg')
                            .addClass(self.options.small ? 'modal-sm' : '')
                            .addClass(self.options.large ? 'modal-lg' : '')
                            .attr('role', 'document')
                            .append(self._ui.content)
                    );

            // Build and add content.
            self._addHeader();
            self._addBody();
            self._addFooter();

            // Add it to the DOM.
            self.element.prepend(self._ui.modal);

            // Activate bootstrap modal.
            self._ui.modal
                .on('show.bs.modal', function () {
                    self._trigger('show');
                })
                .on('shown.bs.modal', function () {
                    self._trigger('shown');
                })
                .on('hide.bs.modal', function () {
                    self._trigger('hide');
                })
                .on('hidden.bs.modal', function () {
                    self._trigger('hidden');
                    self.destroy();
                })
                .modal('show');
        },

        /**
         * Cleaning up.
         *
         * @private
         */
        _destroy: function () {
            this._ui.modal
                .data('modal', null)
                .remove();
        },

        /**
         * Adds a header to the modal.
         */
        _addHeader: function () {
            var closer = '',
                headline = '',
                contentHeader = $(this.options.content).children('div.modal-header')[0];

            // Header
            if (this.options.closer || this.options.headline) {
                if (this.options.closer) {
                    closer = '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                             '</button>';
                }

                if (this.options.headline) {
                    headline = $('<h4/>').addClass('modal-title').append(this.options.headline);
                }

                this._ui.content.append(
                    $('<div/>')
                        .addClass('modal-header')
                        .append(closer)
                        .append(headline)
                );
            } else if (contentHeader) {
                this._ui.content.append(contentHeader);
            }
        },

        /**
         * Adds a body to the modal.
         */
        _addBody: function () {
            var contentBody = $(this.options.content).children('div.modal-body')[0];

            if (this.options.body || !contentBody) {
                this._ui.content.append(
                    $('<div/>')
                        .addClass('modal-body')
                        .append(this.options.body || '')
                );
            } else if (contentBody) {
                this._ui.content.append(contentBody);
            }
        },

        /**
         * Adds a Footer to the modal.
         */
        _addFooter: function () {
            var contentFooter = $(this.options.content).children('div.modal-footer')[0];

            if (this.options.footer) {
                this._ui.content.append(
                    $('<div/>')
                        .addClass('modal-footer')
                        .append(this.options.footer)
                );
            } else if (contentFooter) {
                this._ui.content.append(contentFooter);
            }
        }
    });
})(jQuery);
