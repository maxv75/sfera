<<template>
    <div id="msgBox" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="title != null && title != ''">
                    <button v-if="isHeaderClose" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><i :class="titleIcon"></i><span>{{this.title}}</span></h4>
                </div>
                <div class="modal-body">
                    <p class="modal-body-header" v-if="header && header != ''">{{header}}</p>
                    <div  v-if="!isList">{{messages[0]}}</div>
                    <ul v-if="isList">
                        <li v-for="message in messages">
                            {{message}}
                        </li>
                    </ul>
                    <p class="modal-body-footer" v-if="footer && footer != ''">{{footer}}</p>
                </div>
                <div class="modal-footer" v-if="isFooter && !!isFooter === true">
                    <button type="button" class="btn btn-primary btn-sm" v-bind:class="{ 'pull-right': lang != 'he', 'pull-left': lang == 'he' }" data-dismiss="modal">{{$t('about.contactUs.validation.alertClose')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bootstrap from 'bootstrap';

    export default {
        name: 'modal',
        props: ['type', 'title', 'isHeaderClose', 'isFooter', 'messages', 'showAsList', 'header', 'footer'],
        data () {
            return {
                titleText: this.title
            }
        },
        watch: {
            title: function () {
                this.titleText = this.title;
            }
        },
        methods: {
            open () {
                $('#msgBox').modal('show');
            }
        },
        computed: {
            lang: function () {
                return this.$i18n.locale();
            },
            isList: function() {
                return this.messages.length > 1 || this.showAsList && !!this.showAsList === true;
            },
            titleIcon: function () {
                switch(this.type) {
                    case 'error':
                        return 'glyphicon glyphicon-remove-circle';
                    case 'success':
                        return 'glyphicon glyphicon-ok-circle';
                    case 'warning':
                        return 'glyphicon glyphicon-exclamation-sign';
                    default:
                        return 'glyphicon glyphicon-info-sign';
                }
            }
        }
    }
</script>

<style>
#msgBox .modal-title i {
    font-size: 1.4em;
    vertical-align: middle;
    margin-right: 5px;
}
#site-wrapper.heb #msgBox .modal-title i {
    margin-right: 0;
    margin-left: 5px;
}

#msgBox .modal-title span {
    vertical-align: middle;
    line-height: 1;
}
#msgBox .modal-title i.glyphicon-remove-circle {
    color: #bb0000;
}
#msgBox .modal-title i.glyphicon-ok-circle {
    color: #009900;
}
#msgBox .modal-title i.glyphicon-exclamation-sign {
    color: #ffb41e;
}
#msgBox .modal-title i.glyphicon-info-sign {
    color: #0096DB;
}
#msgBox .modal-body {
    font-size: 1em;
    line-height: 1.5em;
    font-weight: 300;
}
#msgBox .modal-body ul {
    margin: 10px 0;
    padding-left: 30px;
}
#site-wrapper.heb #msgBox .modal-body ul {
    padding-left: 0;
    padding-right: 30px;
}
#msgBox .modal-body .modal-body-header,
#msgBox .modal-body .modal-body-footer {
    padding: 5px 0;
    font-weight: 400;
}
</style>

