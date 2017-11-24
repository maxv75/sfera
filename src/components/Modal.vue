<<template>
    <div id="msgBox" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="title != null && title != ''">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{this.title}}</h4>
                </div>
                <div class="modal-body">
                    {{message}}
                </div>
                <div class="modal-footer" v-if="isFooter && !!isFooter === true">
                    <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">{{$t('about.contactUs.validation.alertClose')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bootstrap from 'bootstrap';

    export default {
        name: 'modal',
        props: ['title', 'isHeaderClose', 'isFooter', 'message'],
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
    }
</script>
