
$(document).ready(function () {

    (function ($) {
        var Defaults = $.fn.select2.amd.require('select2/defaults');
        $.extend(Defaults.defaults, {
            searchInputPlaceholder: ''
        });
        var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
        var _renderSearchDropdown = SearchDropdown.prototype.render;
        SearchDropdown.prototype.render = function (decorated) {
            // invoke parent method
            var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
            this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
            return $rendered;
        };
    })(window.jQuery);


    var data_country = [
        {
            id: 'KE', text: '+254',
            html: '<span class="country-name">Kenya</span><span class="dial-code">+254</span>'
        },
        {
            id: 'US',
            text: '+1',
            html: '<span class="country-name">United states</span><span class="dial-code">+1</span>'
        },
        {
            id: 'GB',
            text: '+44',
            html: '<span class="country-name">United kingdom</span><span class="dial-code">+44</span>'
        },
        {
            id: 'CA',
            text: '+1',
            html: '<span class="country-name">Canada</span><span class="dial-code">+1</span>'
        },
        {
            id: 'AU',
            text: '+61',
            html: '<span class="country-name">Australia</span><span class="dial-code">+61</span>'
        },
        {
            id: 'PH',
            text: '+63',
            html: '<span class="country-name">Philippines</span><span class="dial-code">+63</span>'
        },
        {
            id: 'IN',
            text: '+91',
            html: '<span class="country-name">India</span><span class="dial-code">+91</span>'
        },
        {
            id: 'PK',
            text: '+92',
            html: '<span class="country-name">Pakistan</span><span class="dial-code">+92</span>'
        },
        {
            id: 'UA',
            text: '+380',
            html: '<span class="country-name">Ukraine</span><span class="dial-code">+380</span>'
        },
        {
            id: 'RU',
            text: '+7',
            html: '<span class="country-name">Russian federation</span><span class="dial-code">+7</span>'
        },
        {
            id: 'KZ', text: '+7',
            html: '<span class="country-name">Kazakstan</span><span class="dial-code">+7</span>'
        },
        {
            id: 'BY',
            text: '+375',
            html: '<span class="country-name">Belarus</span><span class="dial-code">+375</span>'
        },
        {
            id: 'AF',
            text: '+93',
            html: '<span class="country-name">Afghanistan</span><span class="dial-code">+93</span>'
        },
        {
            id: 'AX',
            text: '+358',
            html: '<span class="country-name">Aland islands</span><span class="dial-code">+358</span>'
        },
        {
            id: 'AL',
            text: '+355',
            html: '<span class="country-name">Albania</span><span class="dial-code">+355</span>'
        },
        {
            id: 'DZ',
            text: '+213',
            html: '<span class="country-name">Algeria</span><span class="dial-code">+213</span>'
        },
        {
            id: 'AS',
            text: '+1684',
            html: '<span class="country-name">American samoa</span><span class="dial-code">+1684</span>'
        },
        {
            id: 'AD',
            text: '+376',
            html: '<span class="country-name">Andorra</span><span class="dial-code">+376</span>'
        },
        {
            id: 'AO',
            text: '+244',
            html: '<span class="country-name">Angola</span><span class="dial-code">+244</span>'
        },
        {
            id: 'AI',
            text: '+1264',
            html: '<span class="country-name">Anguilla</span><span class="dial-code">+1264</span>'
        },
        {
            id: 'AQ',
            text: '+672',
            html: '<span class="country-name">Antarctica</span><span class="dial-code">+672</span>'
        },
        {
            id: 'AG',
            text: '+1268',
            html: '<span class="country-name">Antigua and barbuda</span><span class="dial-code">+1268</span>'
        },
        {
            id: 'AR',
            text: '+54',
            html: '<span class="country-name">Argentina</span><span class="dial-code">+54</span>'
        },
        {
            id: 'AM',
            text: '+374',
            html: '<span class="country-name">Armenia</span><span class="dial-code">+374</span>'
        },
        {
            id: 'AW', text: '+297',
            html: '<span class="country-name">Aruba</span><span class="dial-code">+297</span>'
        },
        {
            id: 'AT', text: '+43',
            html: '<span class="country-name">Austria</span><span class="dial-code">+43</span>'
        },
        {
            id: 'AZ',
            text: '+994',
            html: '<span class="country-name">Azerbaijan</span><span class="dial-code">+994</span>'
        },
        {
            id: 'BS',
            text: '+1242',
            html: '<span class="country-name">Bahamas</span><span class="dial-code">+1242</span>'
        },
        {
            id: 'BH',
            text: '+973',
            html: '<span class="country-name">Bahrain</span><span class="dial-code">+973</span>'
        },
        {
            id: 'BD',
            text: '+880',
            html: '<span class="country-name">Bangladesh</span><span class="dial-code">+880</span>'
        },
        {
            id: 'BB',
            text: '+1246',
            html: '<span class="country-name">Barbados</span><span class="dial-code">+1246</span>'
        },
        {
            id: 'BE', text: '+32',
            html: '<span class="country-name">Belgium</span><span class="dial-code">+32</span>'
        },
        {
            id: 'BZ',
            text: '+501',
            html: '<span class="country-name">Belize</span><span class="dial-code">+501</span>'
        },
        {
            id: 'BJ', text: '+229',
            html: '<span class="country-name">Benin</span><span class="dial-code">+229</span>'
        },
        {
            id: 'BM',
            text: '+1441',
            html: '<span class="country-name">Bermuda</span><span class="dial-code">+1441</span>'
        },
        {
            id: 'BT',
            text: '+975',
            html: '<span class="country-name">Bhutan</span><span class="dial-code">+975</span>'
        },
        {
            id: 'BO',
            text: '+591',
            html: '<span class="country-name">Bolivia</span><span class="dial-code">+591</span>'
        },
        {
            id: 'BA',
            text: '+387',
            html: '<span class="country-name">Bosnia and herzegovina</span><span class="dial-code">+387</span>'
        },
        {
            id: 'BW',
            text: '+267',
            html: '<span class="country-name">Botswana</span><span class="dial-code">+267</span>'
        },
        {
            id: 'BR',
            text: '+55',
            html: '<span class="country-name">Brazil</span><span class="dial-code">+55</span>'
        },
        {
            id: 'BN',
            text: '+673',
            html: '<span class="country-name">Brunei darussalam</span><span class="dial-code">+673</span>'
        },
        {
            id: 'BG',
            text: '+359',
            html: '<span class="country-name">Bulgaria</span><span class="dial-code">+359</span>'
        },
        {
            id: 'BF',
            text: '+226',
            html: '<span class="country-name">Burkina faso</span><span class="dial-code">+226</span>'
        },
        {
            id: 'BI',
            text: '+257',
            html: '<span class="country-name">Burundi</span><span class="dial-code">+257</span>'
        },
        {
            id: 'KH',
            text: '+855',
            html: '<span class="country-name">Cambodia</span><span class="dial-code">+855</span>'
        },
        {
            id: 'CM',
            text: '+237',
            html: '<span class="country-name">Cameroon</span><span class="dial-code">+237</span>'
        },
        {
            id: 'CV',
            text: '+238',
            html: '<span class="country-name">Cape verde</span><span class="dial-code">+238</span>'
        },
        {
            id: 'KY',
            text: '+1345',
            html: '<span class="country-name">Cayman islands</span><span class="dial-code">+1345</span>'
        },
        {
            id: 'CF',
            text: '+236',
            html: '<span class="country-name">Central african republic</span><span class="dial-code">+236</span>'
        },
        {
            id: 'TD',
            text: '+235',
            html: '<span class="country-name">Chad</span><span class="dial-code">+235</span>'
        },
        {
            id: 'CL',
            text: '+56',
            html: '<span class="country-name">Chile</span><span class="dial-code">+56</span>'
        },
        {
            id: 'CN',
            text: '+86',
            html: '<span class="country-name">China</span><span class="dial-code">+86</span>'
        },
        {
            id: 'CX',
            text: '+61',
            html: '<span class="country-name">Christmas island</span><span class="dial-code">+61</span>'
        },
        {
            id: 'CC',
            text: '+61',
            html: '<span class="country-name">Cocos (keeling) islands</span><span class="dial-code">+61</span>'
        },
        {
            id: 'CO',
            text: '+57',
            html: '<span class="country-name">Colombia</span><span class="dial-code">+57</span>'
        },
        {
            id: 'KM',
            text: '+269',
            html: '<span class="country-name">Comoros</span><span class="dial-code">+269</span>'
        },
        {
            id: 'CG', text: '+242',
            html: '<span class="country-name">Congo</span><span class="dial-code">+242</span>'
        },
        {
            id: 'CD',
            text: '+243',
            html: '<span class="country-name">Congo, the democratic republic of the</span><span class="dial-code">+243</span>'
        },
        {
            id: 'CK',
            text: '+682',
            html: '<span class="country-name">Cook islands</span><span class="dial-code">+682</span>'
        },
        {
            id: 'CR',
            text: '+506',
            html: '<span class="country-name">Costa rica</span><span class="dial-code">+506</span>'
        },
        {
            id: 'CI',
            text: '+225',
            html: '<span class="country-name">Cote d ivoire</span><span class="dial-code">+225</span>'
        },
        {
            id: 'HR',
            text: '+385',
            html: '<span class="country-name">Croatia</span><span class="dial-code">+385</span>'
        },
        {
            id: 'CU',
            text: '+53',
            html: '<span class="country-name">Cuba</span><span class="dial-code">+53</span>'
        },
        {
            id: 'CY',
            text: '+357',
            html: '<span class="country-name">Cyprus</span><span class="dial-code">+357</span>'
        },
        {
            id: 'CZ',
            text: '+420',
            html: '<span class="country-name">Czech republic</span><span class="dial-code">+420</span>'
        },
        {
            id: 'DK', text: '+45',
            html: '<span class="country-name">Denmark</span><span class="dial-code">+45</span>'
        },
        {
            id: 'DJ',
            text: '+253',
            html: '<span class="country-name">Djibouti</span><span class="dial-code">+253</span>'
        },
        {
            id: 'DM',
            text: '+1767',
            html: '<span class="country-name">Dominica</span><span class="dial-code">+1767</span>'
        },
        {
            id: 'DO',
            text: '+1809',
            html: '<span class="country-name">Dominican republic</span><span class="dial-code">+1809</span>'
        },
        {
            id: 'EC',
            text: '+593',
            html: '<span class="country-name">Ecuador</span><span class="dial-code">+593</span>'
        },
        {
            id: 'EG',
            text: '+20',
            html: '<span class="country-name">Egypt</span><span class="dial-code">+20</span>'
        },
        {
            id: 'SV',
            text: '+503',
            html: '<span class="country-name">El salvador</span><span class="dial-code">+503</span>'
        },
        {
            id: 'GQ',
            text: '+240',
            html: '<span class="country-name">Equatorial guinea</span><span class="dial-code">+240</span>'
        },
        {
            id: 'ER',
            text: '+291',
            html: '<span class="country-name">Eritrea</span><span class="dial-code">+291</span>'
        },
        {
            id: 'EE',
            text: '+372',
            html: '<span class="country-name">Estonia</span><span class="dial-code">+372</span>'
        },
        {
            id: 'ET',
            text: '+251',
            html: '<span class="country-name">Ethiopia</span><span class="dial-code">+251</span>'
        },
        {
            id: 'FK',
            text: '+500', html: '<span class="country-name">Falkland islands (malvinas)</span><span class="dial-code">+500</span>'
        },
        {
            id: 'FO',
            text: '+298',
            html: '<span class="country-name">Faroe islands</span><span class="dial-code">+298</span>'
        },
        {
            id: 'FJ',
            text: '+679',
            html: '<span class="country-name">Fiji</span><span class="dial-code">+679</span>'
        },
        {
            id: 'FI',
            text: '+358',
            html: '<span class="country-name">Finland</span><span class="dial-code">+358</span>'
        },
        {
            id: 'FR',
            text: '+33',
            html: '<span class="country-name">France</span><span class="dial-code">+33</span>'
        },
        {
            id: 'GF',
            text: '+594',
            html: '<span class="country-name">French guiana</span><span class="dial-code">+594</span>'
        },
        {
            id: 'PF',
            text: '+689',
            html: '<span class="country-name">French polynesia</span><span class="dial-code">+689</span>'
        },
        {
            id: 'GA', text: '+241',
            html: '<span class="country-name">Gabon</span><span class="dial-code">+241</span>'
        },
        {
            id: 'GM',
            text: '+220',
            html: '<span class="country-name">Gambia</span><span class="dial-code">+220</span>'
        },
        {
            id: 'GE',
            text: '+995',
            html: '<span class="country-name">Georgia</span><span class="dial-code">+995</span>'
        },
        {
            id: 'DE', text: '+49',
            html: '<span class="country-name">Germany</span><span class="dial-code">+49</span>'
        },
        {
            id: 'GH', text: '+233',
            html: '<span class="country-name">Ghana</span><span class="dial-code">+233</span>'
        },
        {
            id: 'GI',
            text: '+350',
            html: '<span class="country-name">Gibraltar</span><span class="dial-code">+350</span>'
        },
        {
            id: 'GR',
            text: '+30',
            html: '<span class="country-name">Greece</span><span class="dial-code">+30</span>'
        },
        {
            id: 'GL',
            text: '+299',
            html: '<span class="country-name">Greenland</span><span class="dial-code">+299</span>'
        },
        {
            id: 'GD',
            text: '+1473',
            html: '<span class="country-name">Grenada</span><span class="dial-code">+1473</span>'
        },
        {
            id: 'GP',
            text: '+590',
            html: '<span class="country-name">Guadeloupe</span><span class="dial-code">+590</span>'
        },
        {
            id: 'GU',
            text: '+1671',
            html: '<span class="country-name">Guam</span><span class="dial-code">+1671</span>'
        },
        {
            id: 'GT',
            text: '+502',
            html: '<span class="country-name">Guatemala</span><span class="dial-code">+502</span>'
        },
        {
            id: 'GN',
            text: '+224',
            html: '<span class="country-name">Guinea</span><span class="dial-code">+224</span>'
        },
        {
            id: 'GW',
            text: '+245',
            html: '<span class="country-name">Guinea-bissau</span><span class="dial-code">+245</span>'
        },
        {
            id: 'GY',
            text: '+592',
            html: '<span class="country-name">Guyana</span><span class="dial-code">+592</span>'
        },
        {
            id: 'HT', text: '+509',
            html: '<span class="country-name">Haiti</span><span class="dial-code">+509</span>'
        },
        {
            id: 'VA',
            text: '+39',
            html: '<span class="country-name">Holy see (vatican city state)</span><span class="dial-code">+39</span>'
        },
        {
            id: 'HN',
            text: '+504',
            html: '<span class="country-name">Honduras</span><span class="dial-code">+504</span>'
        },
        {
            id: 'HK',
            text: '+852',
            html: '<span class="country-name">Hong kong</span><span class="dial-code">+852</span>'
        },
        {
            id: 'HU', text: '+36',
            html: '<span class="country-name">Hungary</span><span class="dial-code">+36</span>'
        },
        {
            id: 'IS',
            text: '+354',
            html: '<span class="country-name">Iceland</span><span class="dial-code">+354</span>'
        },
        {
            id: 'ID',
            text: '+62',
            html: '<span class="country-name">Indonesia</span><span class="dial-code">+62</span>'
        },
        {
            id: 'IR',
            text: '+98',
            html: '<span class="country-name">Iran, islamic republic of</span><span class="dial-code">+98</span>'
        },
        {
            id: 'IQ',
            text: '+964',
            html: '<span class="country-name">Iraq</span><span class="dial-code">+964</span>'
        },
        {
            id: 'IE',
            text: '+353',
            html: '<span class="country-name">Ireland</span><span class="dial-code">+353</span>'
        },
        {
            id: 'IM',
            text: '+44',
            html: '<span class="country-name">Isle of man</span><span class="dial-code">+44</span>'
        },
        {
            id: 'IL',
            text: '+972',
            html: '<span class="country-name">Israel</span><span class="dial-code">+972</span>'
        },
        {
            id: 'IT',
            text: '+39',
            html: '<span class="country-name">Italy</span><span class="dial-code">+39</span>'
        },
        {
            id: 'JM',
            text: '+1876',
            html: '<span class="country-name">Jamaica</span><span class="dial-code">+1876</span>'
        },
        {
            id: 'JP',
            text: '+81',
            html: '<span class="country-name">Japan</span><span class="dial-code">+81</span>'
        },
        {
            id: 'JE',
            text: '+44',
            html: '<span class="country-name">Jersey</span><span class="dial-code">+44</span>'
        },
        {
            id: 'JO',
            text: '+962',
            html: '<span class="country-name">Jordan</span><span class="dial-code">+962</span>'
        },
        {
            id: 'KI',
            text: '+686',
            html: '<span class="country-name">Kiribati</span><span class="dial-code">+686</span>'
        },
        {
            id: 'KP',
            text: '+850',
            html: '<span class="country-name">Korea democratic peoples republic of</span><span class="dial-code">+850</span>'
        },
        {
            id: 'KR',
            text: '+82',
            html: '<span class="country-name">Korea republic of</span><span class="dial-code">+82</span>'
        },
        {
            id: 'XK',
            text: '+381',
            html: '<span class="country-name">Kosovo</span><span class="dial-code">+381</span>'
        },
        {
            id: 'KW',
            text: '+965',
            html: '<span class="country-name">Kuwait</span><span class="dial-code">+965</span>'
        },
        {
            id: 'KG',
            text: '+996',
            html: '<span class="country-name">Kyrgyzstan</span><span class="dial-code">+996</span>'
        },
        {
            id: 'LA',
            text: '+856',
            html: '<span class="country-name">Lao peoples democratic republic</span><span class="dial-code">+856</span>'
        },
        {
            id: 'LV',
            text: '+371',
            html: '<span class="country-name">Latvia</span><span class="dial-code">+371</span>'
        },
        {
            id: 'LB',
            text: '+961',
            html: '<span class="country-name">Lebanon</span><span class="dial-code">+961</span>'
        },
        {
            id: 'LS',
            text: '+266',
            html: '<span class="country-name">Lesotho</span><span class="dial-code">+266</span>'
        },
        {
            id: 'LR',
            text: '+231',
            html: '<span class="country-name">Liberia</span><span class="dial-code">+231</span>'
        },
        {
            id: 'LY',
            text: '+218',
            html: '<span class="country-name">Libyan arab jamahiriya</span><span class="dial-code">+218</span>'
        },
        {
            id: 'LI',
            text: '+423',
            html: '<span class="country-name">Liechtenstein</span><span class="dial-code">+423</span>'
        },
        {
            id: 'LT',
            text: '+370',
            html: '<span class="country-name">Lithuania</span><span class="dial-code">+370</span>'
        },
        {
            id: 'LU',
            text: '+352',
            html: '<span class="country-name">Luxembourg</span><span class="dial-code">+352</span>'
        },
        {
            id: 'MO', text: '+853',
            html: '<span class="country-name">Macau</span><span class="dial-code">+853</span>'
        },
        {
            id: 'MK',
            text: '+389',
            html: '<span class="country-name">Macedonia</span><span class="dial-code">+389</span>'
        },
        {
            id: 'MG',
            text: '+261',
            html: '<span class="country-name">Madagascar</span><span class="dial-code">+261</span>'
        },
        {
            id: 'MW',
            text: '+265',
            html: '<span class="country-name">Malawi</span><span class="dial-code">+265</span>'
        },
        {
            id: 'MY',
            text: '+60',
            html: '<span class="country-name">Malaysia</span><span class="dial-code">+60</span>'
        },
        {
            id: 'MV',
            text: '+960',
            html: '<span class="country-name">Maldives</span><span class="dial-code">+960</span>'
        },
        {
            id: 'ML',
            text: '+223',
            html: '<span class="country-name">Mali</span><span class="dial-code">+223</span>'
        },
        {
            id: 'MT', text: '+356',
            html: '<span class="country-name">Malta</span><span class="dial-code">+356</span>'
        },
        {
            id: 'MH',
            text: '+692',
            html: '<span class="country-name">Marshall islands</span><span class="dial-code">+692</span>'
        },
        {
            id: 'MR',
            text: '+222',
            html: '<span class="country-name">Mauritania</span><span class="dial-code">+222</span>'
        },
        {
            id: 'MU',
            text: '+230',
            html: '<span class="country-name">Mauritius</span><span class="dial-code">+230</span>'
        },
        {
            id: 'YT',
            text: '+262',
            html: '<span class="country-name">Mayotte</span><span class="dial-code">+262</span>'
        },
        {
            id: 'MX',
            text: '+52',
            html: '<span class="country-name">Mexico</span><span class="dial-code">+52</span>'
        },
        {
            id: 'FM',
            text: '+691',
            html: '<span class="country-name">Micronesia, federated states of</span><span class="dial-code">+691</span>'
        },
        {
            id: 'MD',
            text: '+373',
            html: '<span class="country-name">Moldova, republic of</span><span class="dial-code">+373</span>'
        },
        {
            id: 'MC',
            text: '+377',
            html: '<span class="country-name">Monaco</span><span class="dial-code">+377</span>'
        },
        {
            id: 'MN',
            text: '+976',
            html: '<span class="country-name">Mongolia</span><span class="dial-code">+976</span>'
        },
        {
            id: 'ME',
            text: '+382',
            html: '<span class="country-name">Montenegro</span><span class="dial-code">+382</span>'
        },
        {
            id: 'MS',
            text: '+1664',
            html: '<span class="country-name">Montserrat</span><span class="dial-code">+1664</span>'
        },
        {
            id: 'MA',
            text: '+212',
            html: '<span class="country-name">Morocco</span><span class="dial-code">+212</span>'
        },
        {
            id: 'MZ',
            text: '+258',
            html: '<span class="country-name">Mozambique</span><span class="dial-code">+258</span>'
        },
        {
            id: 'MM', text: '+95',
            html: '<span class="country-name">Myanmar</span><span class="dial-code">+95</span>'
        },
        {
            id: 'NA',
            text: '+264',
            html: '<span class="country-name">Namibia</span><span class="dial-code">+264</span>'
        },
        {
            id: 'NR', text: '+674',
            html: '<span class="country-name">Nauru</span><span class="dial-code">+674</span>'
        },
        {
            id: 'NP', text: '+977',
            html: '<span class="country-name">Nepal</span><span class="dial-code">+977</span>'
        },
        {
            id: 'NL',
            text: '+31',
            html: '<span class="country-name">Netherlands</span><span class="dial-code">+31</span>'
        },
        {
            id: 'AN',
            text: '+599',
            html: '<span class="country-name">Netherlands antilles</span><span class="dial-code">+599</span>'
        },
        {
            id: 'NC',
            text: '+687',
            html: '<span class="country-name">New caledonia</span><span class="dial-code">+687</span>'
        },
        {
            id: 'NZ',
            text: '+64',
            html: '<span class="country-name">New zealand</span><span class="dial-code">+64</span>'
        },
        {
            id: 'NI',
            text: '+505',
            html: '<span class="country-name">Nicaragua</span><span class="dial-code">+505</span>'
        },
        {
            id: 'NE', text: '+227',
            html: '<span class="country-name">Niger</span><span class="dial-code">+227</span>'
        },
        {
            id: 'NG',
            text: '+234',
            html: '<span class="country-name">Nigeria</span><span class="dial-code">+234</span>'
        },
        {
            id: 'NU',
            text: '+683',
            html: '<span class="country-name">Niue</span><span class="dial-code">+683</span>'
        },
        {
            id: 'MP',
            text: '+1670',
            html: '<span class="country-name">Northern mariana islands</span><span class="dial-code">+1670</span>'
        },
        {
            id: 'NO',
            text: '+47',
            html: '<span class="country-name">Norway</span><span class="dial-code">+47</span>'
        },
        {
            id: 'OM',
            text: '+968',
            html: '<span class="country-name">Oman</span><span class="dial-code">+968</span>'
        },
        {
            id: 'PW', text: '+680',
            html: '<span class="country-name">Palau</span><span class="dial-code">+680</span>'
        },
        {
            id: 'PS',
            text: '+970',
            html: '<span class="country-name">Palestinian territory</span><span class="dial-code">+970</span>'
        },
        {
            id: 'PA',
            text: '+507',
            html: '<span class="country-name">Panama</span><span class="dial-code">+507</span>'
        },
        {
            id: 'PG',
            text: '+675',
            html: '<span class="country-name">Papua new guinea</span><span class="dial-code">+675</span>'
        },
        {
            id: 'PY',
            text: '+595',
            html: '<span class="country-name">Paraguay</span><span class="dial-code">+595</span>'
        },
        {
            id: 'PE',
            text: '+51',
            html: '<span class="country-name">Peru</span><span class="dial-code">+51</span>'
        },
        {
            id: 'PN',
            text: '+870',
            html: '<span class="country-name">Pitcairn</span><span class="dial-code">+870</span>'
        },
        {
            id: 'PL',
            text: '+48',
            html: '<span class="country-name">Poland</span><span class="dial-code">+48</span>'
        },
        {
            id: 'PT',
            text: '+351',
            html: '<span class="country-name">Portugal</span><span class="dial-code">+351</span>'
        },
        {
            id: 'PR',
            text: '+1',
            html: '<span class="country-name">Puerto rico</span><span class="dial-code">+1</span>'
        },
        {
            id: 'QA', text: '+974',
            html: '<span class="country-name">Qatar</span><span class="dial-code">+974</span>'
        },
        {
            id: 'RE',
            text: '+262',
            html: '<span class="country-name">Reunion</span><span class="dial-code">+262</span>'
        },
        {
            id: 'RO', text: '+40',
            html: '<span class="country-name">Romania</span><span class="dial-code">+40</span>'
        },
        {
            id: 'RW',
            text: '+250',
            html: '<span class="country-name">Rwanda</span><span class="dial-code">+250</span>'
        },
        {
            id: 'BL',
            text: '+590',
            html: '<span class="country-name">Saint barthelemy</span><span class="dial-code">+590</span>'
        },
        {
            id: 'SH',
            text: '+290',
            html: '<span class="country-name">Saint helena</span><span class="dial-code">+290</span>'
        },
        {
            id: 'KN',
            text: '+1869',
            html: '<span class="country-name">Saint kitts and nevis</span><span class="dial-code">+1869</span>'
        },
        {
            id: 'LC',
            text: '+1758',
            html: '<span class="country-name">Saint lucia</span><span class="dial-code">+1758</span>'
        },
        {
            id: 'MF',
            text: '+1599',
            html: '<span class="country-name">Saint martin</span><span class="dial-code">+1599</span>'
        },
        {
            id: 'PM',
            text: '+508',
            html: '<span class="country-name">Saint pierre and miquelon</span><span class="dial-code">+508</span>'
        },
        {
            id: 'VC',
            text: '+1784',
            html: '<span class="country-name">Saint vincent and the grenadines</span><span class="dial-code">+1784</span>'
        },
        {
            id: 'WS', text: '+685',
            html: '<span class="country-name">Samoa</span><span class="dial-code">+685</span>'
        },
        {
            id: 'SM',
            text: '+378',
            html: '<span class="country-name">San marino</span><span class="dial-code">+378</span>'
        },
        {
            id: 'ST',
            text: '+239',
            html: '<span class="country-name">Sao tome and principe</span><span class="dial-code">+239</span>'
        },
        {
            id: 'SA',
            text: '+966',
            html: '<span class="country-name">Saudi arabia</span><span class="dial-code">+966</span>'
        },
        {
            id: 'SN',
            text: '+221',
            html: '<span class="country-name">Senegal</span><span class="dial-code">+221</span>'
        },
        {
            id: 'RS',
            text: '+381',
            html: '<span class="country-name">Serbia</span><span class="dial-code">+381</span>'
        },
        {
            id: 'SC',
            text: '+248',
            html: '<span class="country-name">Seychelles</span><span class="dial-code">+248</span>'
        },
        {
            id: 'SL',
            text: '+232',
            html: '<span class="country-name">Sierra leone</span><span class="dial-code">+232</span>'
        },
        {
            id: 'SG',
            text: '+65',
            html: '<span class="country-name">Singapore</span><span class="dial-code">+65</span>'
        },
        {
            id: 'SK',
            text: '+421',
            html: '<span class="country-name">Slovakia</span><span class="dial-code">+421</span>'
        },
        {
            id: 'SI',
            text: '+386',
            html: '<span class="country-name">Slovenia</span><span class="dial-code">+386</span>'
        },
        {
            id: 'SB',
            text: '+677',
            html: '<span class="country-name">Solomon islands</span><span class="dial-code">+677</span>'
        },
        {
            id: 'SO',
            text: '+252',
            html: '<span class="country-name">Somalia</span><span class="dial-code">+252</span>'
        },
        {
            id: 'ZA',
            text: '+27',
            html: '<span class="country-name">South africa</span><span class="dial-code">+27</span>'
        },
        {
            id: 'ES',
            text: '+34',
            html: '<span class="country-name">Spain</span><span class="dial-code">+34</span>'
        },
        {
            id: 'LK',
            text: '+94',
            html: '<span class="country-name">Sri lanka</span><span class="dial-code">+94</span>'
        },
        {
            id: 'SD', text: '+249',
            html: '<span class="country-name">Sudan</span><span class="dial-code">+249</span>'
        },
        {
            id: 'SR',
            text: '+597',
            html: '<span class="country-name">Suriname</span><span class="dial-code">+597</span>'
        },
        {
            id: 'SZ',
            text: '+268',
            html: '<span class="country-name">Swaziland</span><span class="dial-code">+268</span>'
        },
        {
            id: 'SE',
            text: '+46',
            html: '<span class="country-name">Sweden</span><span class="dial-code">+46</span>'
        },
        {
            id: 'CH',
            text: '+41',
            html: '<span class="country-name">Switzerland</span><span class="dial-code">+41</span>'
        },
        {
            id: 'SY',
            text: '+963',
            html: '<span class="country-name">Syrian arab republic</span><span class="dial-code">+963</span>'
        },
        {
            id: 'TW',
            text: '+886',
            html: '<span class="country-name">Taiwan, province of china</span><span class="dial-code">+886</span>'
        },
        {
            id: 'TJ',
            text: '+992',
            html: '<span class="country-name">Tajikistan</span><span class="dial-code">+992</span>'
        },
        {
            id: 'TZ',
            text: '+255',
            html: '<span class="country-name">Tanzania, united republic of</span><span class="dial-code">+255</span>'
        },
        {
            id: 'TH',
            text: '+66',
            html: '<span class="country-name">Thailand</span><span class="dial-code">+66</span>'
        },
        {
            id: 'TL',
            text: '+670',
            html: '<span class="country-name">Timor-leste</span><span class="dial-code">+670</span>'
        },
        {
            id: 'TG',
            text: '+228',
            html: '<span class="country-name">Togo</span><span class="dial-code">+228</span>'
        },
        {
            id: 'TK',
            text: '+690',
            html: '<span class="country-name">Tokelau</span><span class="dial-code">+690</span>'
        },
        {
            id: 'TO', text: '+676',
            html: '<span class="country-name">Tonga</span><span class="dial-code">+676</span>'
        },
        {
            id: 'TT',
            text: '+1868',
            html: '<span class="country-name">Trinidad and tobago</span><span class="dial-code">+1868</span>'
        },
        {
            id: 'TN',
            text: '+216',
            html: '<span class="country-name">Tunisia</span><span class="dial-code">+216</span>'
        },
        {
            id: 'TR',
            text: '+90',
            html: '<span class="country-name">Turkey</span><span class="dial-code">+90</span>'
        },
        {
            id: 'TM',
            text: '+993',
            html: '<span class="country-name">Turkmenistan</span><span class="dial-code">+993</span>'
        },
        {
            id: 'TC',
            text: '+1649',
            html: '<span class="country-name">Turks and caicos islands</span><span class="dial-code">+1649</span>'
        },
        {
            id: 'TV',
            text: '+688',
            html: '<span class="country-name">Tuvalu</span><span class="dial-code">+688</span>'
        },
        {
            id: 'UG',
            text: '+256',
            html: '<span class="country-name">Uganda</span><span class="dial-code">+256</span>'
        },
        {
            id: 'AE',
            text: '+971',
            html: '<span class="country-name">United arab emirates</span><span class="dial-code">+971</span>'
        },
        {
            id: 'UY',
            text: '+598',
            html: '<span class="country-name">Uruguay</span><span class="dial-code">+598</span>'
        },
        {
            id: 'UZ',
            text: '+998',
            html: '<span class="country-name">Uzbekistan</span><span class="dial-code">+998</span>'
        },
        {
            id: 'VU',
            text: '+678',
            html: '<span class="country-name">Vanuatu</span><span class="dial-code">+678</span>'
        },
        {
            id: 'VE',
            text: '+58',
            html: '<span class="country-name">Venezuela</span><span class="dial-code">+58</span>'
        },
        {
            id: 'VN',
            text: '+84',
            html: '<span class="country-name">Viet nam</span><span class="dial-code">+84</span>'
        },
        {
            id: 'VG',
            text: '+1284',
            html: '<span class="country-name">Virgin islands, british</span><span class="dial-code">+1284</span>'
        },
        {
            id: 'VI',
            text: '+1340',
            html: '<span class="country-name">Virgin islands, u.s.</span><span class="dial-code">+1340</span>'
        },
        {
            id: 'WF',
            text: '+681',
            html: '<span class="country-name">Wallis and futuna</span><span class="dial-code">+681</span>'
        },
        {
            id: 'YE', text: '+967',
            html: '<span class="country-name">Yemen</span><span class="dial-code">+967</span>'
        },
        {
            id: 'ZM',
            text: '+260',
            html: '<span class="country-name">Zambia</span><span class="dial-code">+260</span>'
        },
        {
            id: 'ZW',
            text: '+263',
            html: '<span class="country-name">Zimbabwe</span><span class="dial-code">+263</span>'
        }
    ];

    function template(data) {
        return data.html;
    }

    
    function matchCustom(params, data) {
        if ($.trim(params.term) === '') {
          return data;
        }

        if (typeof data.html === 'undefined') {
          return null;
        }
        
        if (data.html.indexOf(params.term) > -1 || data.html.toLowerCase().indexOf(params.term) > -1) {
          var modifiedData = $.extend({}, data, true);        

          return modifiedData;
        }
        
        return null;
    }

    $('.select2-phone').each(function (e) {
        var $parentInput = $(this).closest('.input-phone-inner');
        $(this).select2({
            dropdownParent: $parentInput,
            searchInputPlaceholder: 'Search',
            data: data_country,
            matcher: matchCustom,
            templateResult: template,
            escapeMarkup: function (m) {
                return m;
            }
        })
    });


});