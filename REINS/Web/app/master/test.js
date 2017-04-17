angular.module('HITS')
    .controller('MyCtrl', function() {
        this.bag = [
            {
                label: 'Glasses',
                value: 'glasses',
                children: [
                    {
                        label: 'Top Hat',
                        value: 'top_hat'
                    }, {
                        label: 'Curly Mustache',
                        value: 'mustachio'
                    }
                ]
            }
        ];

    });