angular.module('PKBL')

.factory('OpenCoverFormService', ['$resource', function ($resource) {
    var openCover = {
        FacOpnCode: "",
        FacOfrNo : "",
        FacType : "",
        FacSubType : "",
        FacOldCode : "",
        FacOldRef : "",
        
        FacOfrDate : "",
        FacRepDate : "",
        FacComDate : "",
        FacExpDate : "",
        FacHoldCvrDate : "",
        FacInpDate : "",
        FacUpdDate : "",


        FacCedant : "",
        FacBroker : "",
        FacCcRef : "",
        FacPolicyNo : "",

        FacSource : "",

        FacMainClass : "",

        FacSubClass : "",

        FacSterr : "",
        FacCurrency : "",

        FacRiPrd : "",
        FacAccSts : "",

        FacRnSts : "N",

        FacRnFlag : "",

        FacInsured : "",

        FacRisk1 : "",

        FacRisk2 : "",


        FacCover1 : "",
        FacCover2 : "",

        FacDesc1 : "",
        FacDesc2 : "",
        FacDesc3 : "",
        FacDesc4 : "",
        FacDesc5 : "",

        FacPremRate1 : "",
        FacPremRate2 : "",

        FacCommRate1 : "",
        FacCommRate2 : "",
        FacComm : "",

        FacGnSts : "",
        FacOthDeduct1 : "",
        FacOthDeduct2 : "",

        FacWrtShr : "",
        FacSndShr : "",
        FacTotsi : "",
        FacCcsi : "",
        FacCcRetn : "",
        FacOursi : "",

        FacGpremium : "",
        FacNpremium : "",
        FacAccsi : "",
        FacDeductible : 0,
        FacIndemnity : 0,
        FacMinPrem : 0,
        FacDepPrem : 0,


        FacInfo1 : "",
        FacInfo2 : "",
        FacInfo3 : "",
        FacInfo4 : "",
        FacInfo5 : "",
        FacInfo6 : "",
        FacInfo7 : "",
        FacInfo8 : "",
        FacInfo9 : "",
        FacInfo10 : "",

        MasterSubType : {},
        MasterCompany : {},
        MasterSterr : {},
        MasterMainClass : {},
        MasterSubClass : {},
        MasterBroker : {},
        MasterStatus : {}
    };

    return {
        set: function (data) {
            openCover = data;
        },
        get: function () {
            return openCover;
        },
        setInitialize: function(){
            openCover = {
                FacOpnCode: "",
                FacOfrNo : "",
                FacType : "",
                FacSubType : "",
                FacOldCode : "",
                FacOldRef : "",

                FacOfrDate : "",
                FacRepDate : "",
                FacComDate : "",
                FacExpDate : "",
                FacHoldCvrDate : "",
                FacInpDate : "",
                FacUpdDate : "",


                FacCedant : "",
                FacBroker : "",
                FacCcRef : "",
                FacPolicyNo : "",

                FacSource : "",

                FacMainClass : "",

                FacSubClass : "",

                FacSterr : "",
                FacCurrency : "",

                FacRiPrd : "",
                FacAccSts : "",

                FacRnSts : "N",

                FacRnFlag : "",

                FacInsured : "",

                FacRisk1 : "",

                FacRisk2 : "",


                FacCover1 : "",
                FacCover2 : "",

                FacDesc1 : "",
                FacDesc2 : "",
                FacDesc3 : "",
                FacDesc4 : "",
                FacDesc5 : "",

                FacPremRate1 : "",
                FacPremRate2 : "",

                FacCommRate1 : "",
                FacCommRate2 : "",
                FacComm : "",

                FacGnSts : "",
                FacOthDeduct1 : "",
                FacOthDeduct2 : "",

                FacWrtShr : "",
                FacSndShr : "",
                FacTotsi : "",
                FacCcsi : "",
                FacCcRetn : "",
                FacOursi : "",

                FacGpremium : "",
                FacNpremium : "",
                FacAccsi : "",
                FacDeductible : 0,
                FacIndemnity : 0,
                FacMinPrem : 0,
                FacDepPrem : 0,


                FacInfo1 : "",
                FacInfo2 : "",
                FacInfo3 : "",
                FacInfo4 : "",
                FacInfo5 : "",
                FacInfo6 : "",
                FacInfo7 : "",
                FacInfo8 : "",
                FacInfo9 : "",
                FacInfo10 : "",

                MasterSubType : {},
                MasterCompany : {},
                MasterSterr : {},
                MasterMainClass : {},
                MasterSubClass : {},
                MasterBroker : {},
                MasterStatus : {}
            };
        }
    };
}]);


