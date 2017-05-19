(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":4}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-emoji",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0",
    "ocf": "0.0.2"
  }
}

},{}],3:[function(require,module,exports){
// adapted from
// https://github.com/HenrikJoreteg/emoji-images/blob/master/emoji-images.js

// list of emojii text to parse
module.exports = [':blush:', ':scream:', ':smirk:', ':smiley:',
':stuck_out_tongue_closed_eyes:', ':stuck_out_tongue_winking_eye:',
':rage:', ':disappointed:', ':sob:', ':kissing_heart:', ':wink:',
':pensive:', ':confounded:', ':flushed:', ':relaxed:', ':mask:',
':heart:', ':broken_heart:', ':sunny:', ':umbrella:', ':cloud:',
':snowflake:', ':snowman:', ':zap:', ':cyclone:', ':foggy:', ':ocean:',
':cat:', ':dog:', ':mouse:', ':hamster:', ':rabbit:', ':wolf:', ':frog:',
':tiger:', ':koala:', ':bear:', ':pig:', ':pig_nose:', ':cow:', ':boar:',
':monkey_face:', ':monkey:', ':horse:', ':racehorse:', ':camel:',
':sheep:', ':elephant:', ':panda_face:', ':snake:', ':bird:',
':baby_chick:', ':hatched_chick:', ':hatching_chick:', ':chicken:',
':penguin:', ':turtle:', ':bug:', ':honeybee:', ':ant:', ':beetle:',
':snail:', ':octopus:', ':tropical_fish:', ':fish:', ':whale:',
':whale2:', ':dolphin:', ':cow2:', ':ram:', ':rat:', ':water_buffalo:',
':tiger2:', ':rabbit2:', ':dragon:', ':goat:', ':rooster:', ':dog2:',
':pig2:', ':mouse2:', ':ox:', ':dragon_face:', ':blowfish:',
':crocodile:', ':dromedary_camel:', ':leopard:', ':cat2:', ':poodle:',
':paw_prints:', ':bouquet:', ':cherry_blossom:', ':tulip:',
':four_leaf_clover:', ':rose:', ':sunflower:', ':hibiscus:',
':maple_leaf:', ':leaves:', ':fallen_leaf:', ':herb:', ':mushroom:',
':cactus:', ':palm_tree:', ':evergreen_tree:', ':deciduous_tree:',
':chestnut:', ':seedling:', ':blossom:', ':ear_of_rice:', ':shell:',
':globe_with_meridians:', ':sun_with_face:', ':full_moon_with_face:',
':new_moon_with_face:', ':new_moon:', ':waxing_crescent_moon:',
':first_quarter_moon:', ':waxing_gibbous_moon:', ':full_moon:',
':waning_gibbous_moon:', ':last_quarter_moon:', ':waning_crescent_moon:',
':last_quarter_moon_with_face:', ':first_quarter_moon_with_face:',
':moon:', ':earth_africa:', ':earth_americas:', ':earth_asia:',
':volcano:', ':milky_way:', ':partly_sunny:', ':octocat:', ':squirrel:',
':bamboo:', ':gift_heart:', ':dolls:', ':school_satchel:',
':mortar_board:', ':flags:', ':fireworks:', ':sparkler:', ':wind_chime:',
':rice_scene:', ':jack_o_lantern:', ':ghost:', ':santa:',
':christmas_tree:', ':gift:', ':bell:', ':no_bell:', ':tanabata_tree:',
':tada:', ':confetti_ball:', ':balloon:', ':crystal_ball:', ':cd:',
':dvd:', ':floppy_disk:', ':camera:', ':video_camera:', ':movie_camera:',
':computer:', ':tv:', ':iphone:', ':phone:', ':telephone:',
':telephone_receiver:', ':pager:', ':fax:', ':minidisc:', ':vhs:',
':sound:', ':speaker:', ':mute:', ':loudspeaker:', ':mega:',
':hourglass:', ':hourglass_flowing_sand:', ':alarm_clock:', ':watch:',
':radio:', ':satellite:', ':loop:', ':mag:', ':mag_right:', ':unlock:',
':lock:', ':lock_with_ink_pen:', ':closed_lock_with_key:', ':key:',
':bulb:', ':flashlight:', ':high_brightness:', ':low_brightness:',
':electric_plug:', ':battery:', ':calling:', ':email:', ':mailbox:',
':postbox:', ':bath:', ':bathtub:', ':shower:', ':toilet:', ':wrench:',
':nut_and_bolt:', ':hammer:', ':seat:', ':moneybag:', ':yen:', ':dollar:',
':pound:', ':euro:', ':credit_card:', ':money_with_wings:', ':e-mail:',
':inbox_tray:', ':outbox_tray:', ':envelope:', ':incoming_envelope:',
':postal_horn:', ':mailbox_closed:', ':mailbox_with_mail:',
':mailbox_with_no_mail:', ':door:', ':smoking:', ':bomb:', ':gun:',
':hocho:', ':pill:', ':syringe:', ':page_facing_up:', ':page_with_curl:',
':bookmark_tabs:', ':bar_chart:', ':chart_with_upwards_trend:',
':chart_with_downwards_trend:', ':scroll:', ':clipboard:', ':calendar:',
':date:', ':card_index:', ':file_folder:', ':open_file_folder:',
':scissors:', ':pushpin:', ':paperclip:', ':black_nib:', ':pencil2:',
':straight_ruler:', ':triangular_ruler:', ':closed_book:', ':green_book:',
':blue_book:', ':orange_book:', ':notebook:',
':notebook_with_decorative_cover:', ':ledger:', ':books:', ':bookmark:',
':name_badge:', ':microscope:', ':telescope:', ':newspaper:',
':football:', ':basketball:', ':soccer:', ':baseball:', ':tennis:',
':8ball:', ':rugby_football:', ':bowling:', ':golf:',
':mountain_bicyclist:', ':bicyclist:', ':horse_racing:', ':snowboarder:',
':swimmer:', ':surfer:', ':ski:', ':spades:', ':hearts:', ':clubs:',
':diamonds:', ':gem:', ':ring:', ':trophy:', ':musical_score:',
':musical_keyboard:', ':violin:', ':space_invader:', ':video_game:',
':black_joker:', ':flower_playing_cards:', ':game_die:', ':dart:',
':mahjong:', ':clapper:', ':memo:', ':pencil:', ':book:', ':art:',
':microphone:', ':headphones:', ':trumpet:', ':saxophone:', ':guitar:',
':shoe:', ':sandal:', ':high_heel:', ':lipstick:', ':boot:', ':shirt:',
':tshirt:', ':necktie:', ':womans_clothes:', ':dress:',
':running_shirt_with_sash:', ':jeans:', ':kimono:', ':bikini:',
':ribbon:', ':tophat:', ':crown:', ':womans_hat:', ':mans_shoe:',
':closed_umbrella:', ':briefcase:', ':handbag:', ':pouch:', ':purse:',
':eyeglasses:', ':fishing_pole_and_fish:', ':coffee:', ':tea:', ':sake:',
':baby_bottle:', ':beer:', ':beers:', ':cocktail:', ':tropical_drink:',
':wine_glass:', ':fork_and_knife:', ':pizza:', ':hamburger:', ':fries:',
':poultry_leg:', ':meat_on_bone:', ':spaghetti:', ':curry:',
':fried_shrimp:', ':bento:', ':sushi:', ':fish_cake:', ':rice_ball:',
':rice_cracker:', ':rice:', ':ramen:', ':stew:', ':oden:', ':dango:',
':egg:', ':bread:', ':doughnut:', ':custard:', ':icecream:',
':ice_cream:', ':shaved_ice:', ':birthday:', ':cake:', ':cookie:',
':chocolate_bar:', ':candy:', ':lollipop:', ':honey_pot:', ':apple:',
':green_apple:', ':tangerine:', ':lemon:', ':cherries:', ':grapes:',
':watermelon:', ':strawberry:', ':peach:', ':melon:', ':banana:',
':pear:', ':pineapple:', ':sweet_potato:', ':eggplant:', ':tomato:',
':corn:', ':alien:', ':angel:', ':anger:', ':angry:', ':anguished:',
':astonished:', ':baby:', ':blue_heart:', ':blush:', ':boom:', ':bow:',
':bowtie:', ':boy:', ':bride_with_veil:', ':broken_heart:',
':bust_in_silhouette:', ':busts_in_silhouette:', ':clap:', ':cold_sweat:',
':collision:', ':confounded:', ':confused:', ':construction_worker:',
':cop:', ':couple_with_heart:', ':couple:', ':couplekiss:', ':cry:',
':crying_cat_face:', ':cupid:', ':dancer:', ':dancers:', ':dash:',
':disappointed:', ':dizzy_face:', ':dizzy:', ':droplet:', ':ear:',
':exclamation:', ':expressionless:', ':eyes:', ':facepunch:', ':family:',
':fearful:', ':feelsgood:', ':feet:', ':finnadie:', ':fire:', ':fist:',
':flushed:', ':frowning:', ':girl:', ':goberserk:', ':godmode:',
':green_heart:', ':grey_exclamation:', ':grey_question:', ':grimacing:',
':grin:', ':grinning:', ':guardsman:', ':haircut:', ':hand:', ':hankey:',
':hear_no_evil:', ':heart_eyes_cat:', ':heart_eyes:', ':heart:',
':heartbeat:', ':heartpulse:', ':hurtrealbad:', ':hushed:', ':imp:',
':information_desk_person:', ':innocent:', ':japanese_goblin:',
':japanese_ogre:', ':joy_cat:', ':joy:', ':kiss:', ':kissing_cat:',
':kissing_closed_eyes:', ':kissing_heart:', ':kissing_smiling_eyes:',
':kissing:', ':laughing:', ':lips:', ':love_letter:',
':man_with_gua_pi_mao:', ':man_with_turban:', ':man:', ':mask:',
':massage:', ':metal:', ':muscle:', ':musical_note:', ':nail_care:',
':neckbeard:', ':neutral_face:', ':no_good:', ':no_mouth:', ':nose:',
':notes:', ':ok_hand:', ':ok_woman:', ':older_man:', ':older_woman:',
':open_hands:', ':open_mouth:', ':pensive:', ':persevere:',
':person_frowning:', ':person_with_blond_hair:',
':person_with_pouting_face:', ':point_down:', ':point_left:',
':point_right:', ':point_up_2:', ':point_up:', ':poop:', ':pouting_cat:',
':pray:', ':princess:', ':punch:', ':purple_heart:', ':question:',
':rage:', ':rage1:', ':rage2:', ':rage3:', ':rage4:', ':raised_hand:',
':raised_hands:', ':relaxed:', ':relieved:', ':revolving_hearts:',
':runner:', ':running:', ':satisfied:', ':scream_cat:', ':scream:',
':see_no_evil:', ':shit:', ':skull:', ':sleeping:', ':sleepy:',
':smile_cat:', ':smile:', ':smiley_cat:', ':smiley:', ':smiling_imp:',
':smirk_cat:', ':smirk:', ':sob:', ':sparkling_heart:', ':sparkles:',
':speak_no_evil:', ':speech_balloon:', ':star:', ':star2:',
':stuck_out_tongue_closed_eyes:', ':stuck_out_tongue_winking_eye:',
':stuck_out_tongue:', ':sunglasses:', ':suspect:', ':sweat_drops:',
':sweat_smile:', ':sweat:', ':thought_balloon:', ':-1:', ':thumbsdown:',
':thumbsup:', ':+1:', ':tired_face:', ':tongue:', ':triumph:',
':trollface:', ':two_hearts:', ':two_men_holding_hands:',
':two_women_holding_hands:', ':unamused:', ':v:', ':walking:', ':wave:',
':weary:', ':wink2:', ':wink:', ':woman:', ':worried:', ':yellow_heart:',
':yum:', ':zzz:', ':109:', ':house:', ':house_with_garden:', ':school:',
':office:', ':post_office:', ':hospital:', ':bank:',
':convenience_store:', ':love_hotel:', ':hotel:', ':wedding:', ':church:',
':department_store:', ':european_post_office:', ':city_sunrise:',
':city_sunset:', ':japanese_castle:', ':european_castle:', ':tent:',
':factory:', ':tokyo_tower:', ':japan:', ':mount_fuji:',
':sunrise_over_mountains:', ':sunrise:', ':stars:', ':statue_of_liberty:',
':bridge_at_night:', ':carousel_horse:', ':rainbow:', ':ferris_wheel:',
':fountain:', ':roller_coaster:', ':ship:', ':speedboat:', ':boat:',
':sailboat:', ':rowboat:', ':anchor:', ':rocket:', ':airplane:',
':helicopter:', ':steam_locomotive:', ':tram:', ':mountain_railway:',
':bike:', ':aerial_tramway:', ':suspension_railway:',
':mountain_cableway:', ':tractor:', ':blue_car:', ':oncoming_automobile:',
':car:', ':red_car:', ':taxi:', ':oncoming_taxi:', ':articulated_lorry:',
':bus:', ':oncoming_bus:', ':rotating_light:', ':police_car:',
':oncoming_police_car:', ':fire_engine:', ':ambulance:', ':minibus:',
':truck:', ':train:', ':station:', ':train2:', ':bullettrain_front:',
':bullettrain_side:', ':light_rail:', ':monorail:', ':railway_car:',
':trolleybus:', ':ticket:', ':fuelpump:', ':vertical_traffic_light:',
':traffic_light:', ':warning:', ':construction:', ':beginner:', ':atm:',
':slot_machine:', ':busstop:', ':barber:', ':hotsprings:',
':checkered_flag:', ':crossed_flags:', ':izakaya_lantern:', ':moyai:',
':circus_tent:', ':performing_arts:', ':round_pushpin:',
':triangular_flag_on_post:', ':jp:', ':kr:', ':cn:', ':us:', ':fr:',
':es:', ':it:', ':ru:', ':gb:', ':uk:', ':de:', ':100:', ':1234:',
':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:',
':eight:', ':nine:', ':keycap_ten:', ':zero:', ':hash:', ':symbols:',
':arrow_backward:', ':arrow_down:', ':arrow_forward:', ':arrow_left:',
':capital_abcd:', ':abcd:', ':abc:', ':arrow_lower_left:',
':arrow_lower_right:', ':arrow_right:', ':arrow_up:',
':arrow_upper_left:', ':arrow_upper_right:', ':arrow_double_down:',
':arrow_double_up:', ':arrow_down_small:', ':arrow_heading_down:',
':arrow_heading_up:', ':leftwards_arrow_with_hook:', ':arrow_right_hook:',
':left_right_arrow:', ':arrow_up_down:', ':arrow_up_small:',
':arrows_clockwise:', ':arrows_counterclockwise:', ':rewind:',
':fast_forward:', ':information_source:', ':ok:',
':twisted_rightwards_arrows:', ':repeat:', ':repeat_one:', ':new:',
':top:', ':up:', ':cool:', ':free:', ':ng:', ':cinema:', ':koko:',
':signal_strength:', ':u5272:', ':u5408:', ':u55b6:', ':u6307:',
':u6708:', ':u6709:', ':u6e80:', ':u7121:', ':u7533:', ':u7a7a:',
':u7981:', ':sa:', ':restroom:', ':mens:', ':womens:', ':baby_symbol:',
':no_smoking:', ':parking:', ':wheelchair:', ':metro:', ':baggage_claim:',
':accept:', ':wc:', ':potable_water:', ':put_litter_in_its_place:',
':secret:', ':congratulations:', ':m:', ':passport_control:',
':left_luggage:', ':customs:', ':ideograph_advantage:', ':cl:', ':sos:',
':id:', ':no_entry_sign:', ':underage:', ':no_mobile_phones:',
':do_not_litter:', ':non-potable_water:', ':no_bicycles:',
':no_pedestrians:', ':children_crossing:', ':no_entry:',
':eight_spoked_asterisk:', ':eight_pointed_black_star:',
':heart_decoration:', ':vs:', ':vibration_mode:', ':mobile_phone_off:',
':chart:', ':currency_exchange:', ':aries:', ':taurus:', ':gemini:',
':cancer:', ':leo:', ':virgo:', ':libra:', ':scorpius:', ':sagittarius:',
':capricorn:', ':aquarius:', ':pisces:', ':ophiuchus:',
':six_pointed_star:', ':negative_squared_cross_mark:', ':a:', ':b:',
':ab:', ':o2:', ':diamond_shape_with_a_dot_inside:', ':recycle:', ':end:',
':on:', ':soon:', ':clock1:', ':clock130:', ':clock10:', ':clock1030:',
':clock11:', ':clock1130:', ':clock12:', ':clock1230:', ':clock2:',
':clock230:', ':clock3:', ':clock330:', ':clock4:', ':clock430:',
':clock5:', ':clock530:', ':clock6:', ':clock630:', ':clock7:',
':clock730:', ':clock8:', ':clock830:', ':clock9:', ':clock930:',
':heavy_dollar_sign:', ':copyright:', ':registered:', ':tm:', ':x:',
':heavy_exclamation_mark:', ':bangbang:', ':interrobang:', ':o:',
':heavy_multiplication_x:', ':heavy_plus_sign:', ':heavy_minus_sign:',
':heavy_division_sign:', ':white_flower:', ':heavy_check_mark:',
':ballot_box_with_check:', ':radio_button:', ':link:', ':curly_loop:',
':wavy_dash:', ':part_alternation_mark:', ':trident:', ':black_square:',
':white_square:', ':white_check_mark:', ':black_square_button:',
':white_square_button:', ':black_circle:', ':white_circle:',
':red_circle:', ':large_blue_circle:', ':large_blue_diamond:',
':large_orange_diamond:', ':small_blue_diamond:',
':small_orange_diamond:', ':small_red_triangle:',
':small_red_triangle_down:', ':shipit:'];

},{}],4:[function(require,module,exports){
let emojis = require('./emoji.js');

// this is an example of middleware used in our test.js
// adds some text to message before it's sent and when it's received
module.exports = (config) => {

    // regular expression to find emoji strings
    const test = /:[a-z0-9_\-\+]+:/g;

    // create empty config object if not supplied
    config = config || {};

    config.height = config.height || 16;

    // where emoji images are hosted. filename (ex: /smile.png) will be added
    config.url = config.url || 'http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis';

    // function to parse string for :smile: and other emoji
    const emoji = (someString, url = config.url, height = config.height) => someString.replace(test, (match) => {

        // use regex to find emoji and replace with html
        let result = match;

        // if text string is in list of emojis
        if (emojis.indexOf(match) !== -1) {

            // remove the : before and after
            let name = String(match).slice(1, -1);

            // return html image, using url and height supplied in
            // function
            result = '<img class="emoji" title=":' + name
                + ':" alt="' + name + '" src="' + url + '/'
                + encodeURIComponent(name) + '.png"'
                + (height ? (' height="' + height + '"') : '')
                + ' />';

        }

        return result;

    });

    let parseEmoji = function(payload, next) {

        if(payload.data.text) {
            // parse emoji
            payload.data.text = emoji(payload.data.text, config.url, config.height);
        }

        // continue along middleware
        next(null, payload);

    };

    // define middleware to run after a message has been received and OCF has processed it
    let broadcast = {
        'message': parseEmoji,
        '$history.message': parseEmoji
    };

    // these are new methods that will be added to the extended class
    class extension {
        render(string, url, height) {
            return emoji(string, url, height);
        }
        search(query) {

            var results = [];

            for(var i in emojis) {
                if(emojis[i].substring(0, query.length) == query) {
                    results.push(emojis[i]);
                }
            }

            return results;

        }
    }

    // middleware tells the framework to use these functions when
    // messages are sent or received
    return {
        namespace: 'emoji',
        middleware: {
            broadcast: broadcast
        },
        extends: {
            Chat: extension,
            GlobalChat: extension
        }
    }
}

},{"./emoji.js":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvZW1vamkuanMiLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuT3BlbkNoYXRGcmFtZXdvcmsucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIm9jZi1lbW9qaVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm9jZlwiOiBcIl4wLjAuNFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeMy41LjBcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMy4wXCIsXG4gICAgXCJvY2ZcIjogXCIwLjAuMlwiXG4gIH1cbn1cbiIsIi8vIGFkYXB0ZWQgZnJvbVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0hlbnJpa0pvcmV0ZWcvZW1vamktaW1hZ2VzL2Jsb2IvbWFzdGVyL2Vtb2ppLWltYWdlcy5qc1xuXG4vLyBsaXN0IG9mIGVtb2ppaSB0ZXh0IHRvIHBhcnNlXG5tb2R1bGUuZXhwb3J0cyA9IFsnOmJsdXNoOicsICc6c2NyZWFtOicsICc6c21pcms6JywgJzpzbWlsZXk6Jyxcbic6c3R1Y2tfb3V0X3Rvbmd1ZV9jbG9zZWRfZXllczonLCAnOnN0dWNrX291dF90b25ndWVfd2lua2luZ19leWU6Jyxcbic6cmFnZTonLCAnOmRpc2FwcG9pbnRlZDonLCAnOnNvYjonLCAnOmtpc3NpbmdfaGVhcnQ6JywgJzp3aW5rOicsXG4nOnBlbnNpdmU6JywgJzpjb25mb3VuZGVkOicsICc6Zmx1c2hlZDonLCAnOnJlbGF4ZWQ6JywgJzptYXNrOicsXG4nOmhlYXJ0OicsICc6YnJva2VuX2hlYXJ0OicsICc6c3Vubnk6JywgJzp1bWJyZWxsYTonLCAnOmNsb3VkOicsXG4nOnNub3dmbGFrZTonLCAnOnNub3dtYW46JywgJzp6YXA6JywgJzpjeWNsb25lOicsICc6Zm9nZ3k6JywgJzpvY2VhbjonLFxuJzpjYXQ6JywgJzpkb2c6JywgJzptb3VzZTonLCAnOmhhbXN0ZXI6JywgJzpyYWJiaXQ6JywgJzp3b2xmOicsICc6ZnJvZzonLFxuJzp0aWdlcjonLCAnOmtvYWxhOicsICc6YmVhcjonLCAnOnBpZzonLCAnOnBpZ19ub3NlOicsICc6Y293OicsICc6Ym9hcjonLFxuJzptb25rZXlfZmFjZTonLCAnOm1vbmtleTonLCAnOmhvcnNlOicsICc6cmFjZWhvcnNlOicsICc6Y2FtZWw6Jyxcbic6c2hlZXA6JywgJzplbGVwaGFudDonLCAnOnBhbmRhX2ZhY2U6JywgJzpzbmFrZTonLCAnOmJpcmQ6Jyxcbic6YmFieV9jaGljazonLCAnOmhhdGNoZWRfY2hpY2s6JywgJzpoYXRjaGluZ19jaGljazonLCAnOmNoaWNrZW46Jyxcbic6cGVuZ3VpbjonLCAnOnR1cnRsZTonLCAnOmJ1ZzonLCAnOmhvbmV5YmVlOicsICc6YW50OicsICc6YmVldGxlOicsXG4nOnNuYWlsOicsICc6b2N0b3B1czonLCAnOnRyb3BpY2FsX2Zpc2g6JywgJzpmaXNoOicsICc6d2hhbGU6Jyxcbic6d2hhbGUyOicsICc6ZG9scGhpbjonLCAnOmNvdzI6JywgJzpyYW06JywgJzpyYXQ6JywgJzp3YXRlcl9idWZmYWxvOicsXG4nOnRpZ2VyMjonLCAnOnJhYmJpdDI6JywgJzpkcmFnb246JywgJzpnb2F0OicsICc6cm9vc3RlcjonLCAnOmRvZzI6Jyxcbic6cGlnMjonLCAnOm1vdXNlMjonLCAnOm94OicsICc6ZHJhZ29uX2ZhY2U6JywgJzpibG93ZmlzaDonLFxuJzpjcm9jb2RpbGU6JywgJzpkcm9tZWRhcnlfY2FtZWw6JywgJzpsZW9wYXJkOicsICc6Y2F0MjonLCAnOnBvb2RsZTonLFxuJzpwYXdfcHJpbnRzOicsICc6Ym91cXVldDonLCAnOmNoZXJyeV9ibG9zc29tOicsICc6dHVsaXA6Jyxcbic6Zm91cl9sZWFmX2Nsb3ZlcjonLCAnOnJvc2U6JywgJzpzdW5mbG93ZXI6JywgJzpoaWJpc2N1czonLFxuJzptYXBsZV9sZWFmOicsICc6bGVhdmVzOicsICc6ZmFsbGVuX2xlYWY6JywgJzpoZXJiOicsICc6bXVzaHJvb206Jyxcbic6Y2FjdHVzOicsICc6cGFsbV90cmVlOicsICc6ZXZlcmdyZWVuX3RyZWU6JywgJzpkZWNpZHVvdXNfdHJlZTonLFxuJzpjaGVzdG51dDonLCAnOnNlZWRsaW5nOicsICc6Ymxvc3NvbTonLCAnOmVhcl9vZl9yaWNlOicsICc6c2hlbGw6Jyxcbic6Z2xvYmVfd2l0aF9tZXJpZGlhbnM6JywgJzpzdW5fd2l0aF9mYWNlOicsICc6ZnVsbF9tb29uX3dpdGhfZmFjZTonLFxuJzpuZXdfbW9vbl93aXRoX2ZhY2U6JywgJzpuZXdfbW9vbjonLCAnOndheGluZ19jcmVzY2VudF9tb29uOicsXG4nOmZpcnN0X3F1YXJ0ZXJfbW9vbjonLCAnOndheGluZ19naWJib3VzX21vb246JywgJzpmdWxsX21vb246Jyxcbic6d2FuaW5nX2dpYmJvdXNfbW9vbjonLCAnOmxhc3RfcXVhcnRlcl9tb29uOicsICc6d2FuaW5nX2NyZXNjZW50X21vb246Jyxcbic6bGFzdF9xdWFydGVyX21vb25fd2l0aF9mYWNlOicsICc6Zmlyc3RfcXVhcnRlcl9tb29uX3dpdGhfZmFjZTonLFxuJzptb29uOicsICc6ZWFydGhfYWZyaWNhOicsICc6ZWFydGhfYW1lcmljYXM6JywgJzplYXJ0aF9hc2lhOicsXG4nOnZvbGNhbm86JywgJzptaWxreV93YXk6JywgJzpwYXJ0bHlfc3Vubnk6JywgJzpvY3RvY2F0OicsICc6c3F1aXJyZWw6Jyxcbic6YmFtYm9vOicsICc6Z2lmdF9oZWFydDonLCAnOmRvbGxzOicsICc6c2Nob29sX3NhdGNoZWw6Jyxcbic6bW9ydGFyX2JvYXJkOicsICc6ZmxhZ3M6JywgJzpmaXJld29ya3M6JywgJzpzcGFya2xlcjonLCAnOndpbmRfY2hpbWU6Jyxcbic6cmljZV9zY2VuZTonLCAnOmphY2tfb19sYW50ZXJuOicsICc6Z2hvc3Q6JywgJzpzYW50YTonLFxuJzpjaHJpc3RtYXNfdHJlZTonLCAnOmdpZnQ6JywgJzpiZWxsOicsICc6bm9fYmVsbDonLCAnOnRhbmFiYXRhX3RyZWU6Jyxcbic6dGFkYTonLCAnOmNvbmZldHRpX2JhbGw6JywgJzpiYWxsb29uOicsICc6Y3J5c3RhbF9iYWxsOicsICc6Y2Q6Jyxcbic6ZHZkOicsICc6ZmxvcHB5X2Rpc2s6JywgJzpjYW1lcmE6JywgJzp2aWRlb19jYW1lcmE6JywgJzptb3ZpZV9jYW1lcmE6Jyxcbic6Y29tcHV0ZXI6JywgJzp0djonLCAnOmlwaG9uZTonLCAnOnBob25lOicsICc6dGVsZXBob25lOicsXG4nOnRlbGVwaG9uZV9yZWNlaXZlcjonLCAnOnBhZ2VyOicsICc6ZmF4OicsICc6bWluaWRpc2M6JywgJzp2aHM6Jyxcbic6c291bmQ6JywgJzpzcGVha2VyOicsICc6bXV0ZTonLCAnOmxvdWRzcGVha2VyOicsICc6bWVnYTonLFxuJzpob3VyZ2xhc3M6JywgJzpob3VyZ2xhc3NfZmxvd2luZ19zYW5kOicsICc6YWxhcm1fY2xvY2s6JywgJzp3YXRjaDonLFxuJzpyYWRpbzonLCAnOnNhdGVsbGl0ZTonLCAnOmxvb3A6JywgJzptYWc6JywgJzptYWdfcmlnaHQ6JywgJzp1bmxvY2s6Jyxcbic6bG9jazonLCAnOmxvY2tfd2l0aF9pbmtfcGVuOicsICc6Y2xvc2VkX2xvY2tfd2l0aF9rZXk6JywgJzprZXk6Jyxcbic6YnVsYjonLCAnOmZsYXNobGlnaHQ6JywgJzpoaWdoX2JyaWdodG5lc3M6JywgJzpsb3dfYnJpZ2h0bmVzczonLFxuJzplbGVjdHJpY19wbHVnOicsICc6YmF0dGVyeTonLCAnOmNhbGxpbmc6JywgJzplbWFpbDonLCAnOm1haWxib3g6Jyxcbic6cG9zdGJveDonLCAnOmJhdGg6JywgJzpiYXRodHViOicsICc6c2hvd2VyOicsICc6dG9pbGV0OicsICc6d3JlbmNoOicsXG4nOm51dF9hbmRfYm9sdDonLCAnOmhhbW1lcjonLCAnOnNlYXQ6JywgJzptb25leWJhZzonLCAnOnllbjonLCAnOmRvbGxhcjonLFxuJzpwb3VuZDonLCAnOmV1cm86JywgJzpjcmVkaXRfY2FyZDonLCAnOm1vbmV5X3dpdGhfd2luZ3M6JywgJzplLW1haWw6Jyxcbic6aW5ib3hfdHJheTonLCAnOm91dGJveF90cmF5OicsICc6ZW52ZWxvcGU6JywgJzppbmNvbWluZ19lbnZlbG9wZTonLFxuJzpwb3N0YWxfaG9ybjonLCAnOm1haWxib3hfY2xvc2VkOicsICc6bWFpbGJveF93aXRoX21haWw6Jyxcbic6bWFpbGJveF93aXRoX25vX21haWw6JywgJzpkb29yOicsICc6c21va2luZzonLCAnOmJvbWI6JywgJzpndW46Jyxcbic6aG9jaG86JywgJzpwaWxsOicsICc6c3lyaW5nZTonLCAnOnBhZ2VfZmFjaW5nX3VwOicsICc6cGFnZV93aXRoX2N1cmw6Jyxcbic6Ym9va21hcmtfdGFiczonLCAnOmJhcl9jaGFydDonLCAnOmNoYXJ0X3dpdGhfdXB3YXJkc190cmVuZDonLFxuJzpjaGFydF93aXRoX2Rvd253YXJkc190cmVuZDonLCAnOnNjcm9sbDonLCAnOmNsaXBib2FyZDonLCAnOmNhbGVuZGFyOicsXG4nOmRhdGU6JywgJzpjYXJkX2luZGV4OicsICc6ZmlsZV9mb2xkZXI6JywgJzpvcGVuX2ZpbGVfZm9sZGVyOicsXG4nOnNjaXNzb3JzOicsICc6cHVzaHBpbjonLCAnOnBhcGVyY2xpcDonLCAnOmJsYWNrX25pYjonLCAnOnBlbmNpbDI6Jyxcbic6c3RyYWlnaHRfcnVsZXI6JywgJzp0cmlhbmd1bGFyX3J1bGVyOicsICc6Y2xvc2VkX2Jvb2s6JywgJzpncmVlbl9ib29rOicsXG4nOmJsdWVfYm9vazonLCAnOm9yYW5nZV9ib29rOicsICc6bm90ZWJvb2s6Jyxcbic6bm90ZWJvb2tfd2l0aF9kZWNvcmF0aXZlX2NvdmVyOicsICc6bGVkZ2VyOicsICc6Ym9va3M6JywgJzpib29rbWFyazonLFxuJzpuYW1lX2JhZGdlOicsICc6bWljcm9zY29wZTonLCAnOnRlbGVzY29wZTonLCAnOm5ld3NwYXBlcjonLFxuJzpmb290YmFsbDonLCAnOmJhc2tldGJhbGw6JywgJzpzb2NjZXI6JywgJzpiYXNlYmFsbDonLCAnOnRlbm5pczonLFxuJzo4YmFsbDonLCAnOnJ1Z2J5X2Zvb3RiYWxsOicsICc6Ym93bGluZzonLCAnOmdvbGY6Jyxcbic6bW91bnRhaW5fYmljeWNsaXN0OicsICc6YmljeWNsaXN0OicsICc6aG9yc2VfcmFjaW5nOicsICc6c25vd2JvYXJkZXI6Jyxcbic6c3dpbW1lcjonLCAnOnN1cmZlcjonLCAnOnNraTonLCAnOnNwYWRlczonLCAnOmhlYXJ0czonLCAnOmNsdWJzOicsXG4nOmRpYW1vbmRzOicsICc6Z2VtOicsICc6cmluZzonLCAnOnRyb3BoeTonLCAnOm11c2ljYWxfc2NvcmU6Jyxcbic6bXVzaWNhbF9rZXlib2FyZDonLCAnOnZpb2xpbjonLCAnOnNwYWNlX2ludmFkZXI6JywgJzp2aWRlb19nYW1lOicsXG4nOmJsYWNrX2pva2VyOicsICc6Zmxvd2VyX3BsYXlpbmdfY2FyZHM6JywgJzpnYW1lX2RpZTonLCAnOmRhcnQ6Jyxcbic6bWFoam9uZzonLCAnOmNsYXBwZXI6JywgJzptZW1vOicsICc6cGVuY2lsOicsICc6Ym9vazonLCAnOmFydDonLFxuJzptaWNyb3Bob25lOicsICc6aGVhZHBob25lczonLCAnOnRydW1wZXQ6JywgJzpzYXhvcGhvbmU6JywgJzpndWl0YXI6Jyxcbic6c2hvZTonLCAnOnNhbmRhbDonLCAnOmhpZ2hfaGVlbDonLCAnOmxpcHN0aWNrOicsICc6Ym9vdDonLCAnOnNoaXJ0OicsXG4nOnRzaGlydDonLCAnOm5lY2t0aWU6JywgJzp3b21hbnNfY2xvdGhlczonLCAnOmRyZXNzOicsXG4nOnJ1bm5pbmdfc2hpcnRfd2l0aF9zYXNoOicsICc6amVhbnM6JywgJzpraW1vbm86JywgJzpiaWtpbmk6Jyxcbic6cmliYm9uOicsICc6dG9waGF0OicsICc6Y3Jvd246JywgJzp3b21hbnNfaGF0OicsICc6bWFuc19zaG9lOicsXG4nOmNsb3NlZF91bWJyZWxsYTonLCAnOmJyaWVmY2FzZTonLCAnOmhhbmRiYWc6JywgJzpwb3VjaDonLCAnOnB1cnNlOicsXG4nOmV5ZWdsYXNzZXM6JywgJzpmaXNoaW5nX3BvbGVfYW5kX2Zpc2g6JywgJzpjb2ZmZWU6JywgJzp0ZWE6JywgJzpzYWtlOicsXG4nOmJhYnlfYm90dGxlOicsICc6YmVlcjonLCAnOmJlZXJzOicsICc6Y29ja3RhaWw6JywgJzp0cm9waWNhbF9kcmluazonLFxuJzp3aW5lX2dsYXNzOicsICc6Zm9ya19hbmRfa25pZmU6JywgJzpwaXp6YTonLCAnOmhhbWJ1cmdlcjonLCAnOmZyaWVzOicsXG4nOnBvdWx0cnlfbGVnOicsICc6bWVhdF9vbl9ib25lOicsICc6c3BhZ2hldHRpOicsICc6Y3Vycnk6Jyxcbic6ZnJpZWRfc2hyaW1wOicsICc6YmVudG86JywgJzpzdXNoaTonLCAnOmZpc2hfY2FrZTonLCAnOnJpY2VfYmFsbDonLFxuJzpyaWNlX2NyYWNrZXI6JywgJzpyaWNlOicsICc6cmFtZW46JywgJzpzdGV3OicsICc6b2RlbjonLCAnOmRhbmdvOicsXG4nOmVnZzonLCAnOmJyZWFkOicsICc6ZG91Z2hudXQ6JywgJzpjdXN0YXJkOicsICc6aWNlY3JlYW06Jyxcbic6aWNlX2NyZWFtOicsICc6c2hhdmVkX2ljZTonLCAnOmJpcnRoZGF5OicsICc6Y2FrZTonLCAnOmNvb2tpZTonLFxuJzpjaG9jb2xhdGVfYmFyOicsICc6Y2FuZHk6JywgJzpsb2xsaXBvcDonLCAnOmhvbmV5X3BvdDonLCAnOmFwcGxlOicsXG4nOmdyZWVuX2FwcGxlOicsICc6dGFuZ2VyaW5lOicsICc6bGVtb246JywgJzpjaGVycmllczonLCAnOmdyYXBlczonLFxuJzp3YXRlcm1lbG9uOicsICc6c3RyYXdiZXJyeTonLCAnOnBlYWNoOicsICc6bWVsb246JywgJzpiYW5hbmE6Jyxcbic6cGVhcjonLCAnOnBpbmVhcHBsZTonLCAnOnN3ZWV0X3BvdGF0bzonLCAnOmVnZ3BsYW50OicsICc6dG9tYXRvOicsXG4nOmNvcm46JywgJzphbGllbjonLCAnOmFuZ2VsOicsICc6YW5nZXI6JywgJzphbmdyeTonLCAnOmFuZ3Vpc2hlZDonLFxuJzphc3RvbmlzaGVkOicsICc6YmFieTonLCAnOmJsdWVfaGVhcnQ6JywgJzpibHVzaDonLCAnOmJvb206JywgJzpib3c6Jyxcbic6Ym93dGllOicsICc6Ym95OicsICc6YnJpZGVfd2l0aF92ZWlsOicsICc6YnJva2VuX2hlYXJ0OicsXG4nOmJ1c3RfaW5fc2lsaG91ZXR0ZTonLCAnOmJ1c3RzX2luX3NpbGhvdWV0dGU6JywgJzpjbGFwOicsICc6Y29sZF9zd2VhdDonLFxuJzpjb2xsaXNpb246JywgJzpjb25mb3VuZGVkOicsICc6Y29uZnVzZWQ6JywgJzpjb25zdHJ1Y3Rpb25fd29ya2VyOicsXG4nOmNvcDonLCAnOmNvdXBsZV93aXRoX2hlYXJ0OicsICc6Y291cGxlOicsICc6Y291cGxla2lzczonLCAnOmNyeTonLFxuJzpjcnlpbmdfY2F0X2ZhY2U6JywgJzpjdXBpZDonLCAnOmRhbmNlcjonLCAnOmRhbmNlcnM6JywgJzpkYXNoOicsXG4nOmRpc2FwcG9pbnRlZDonLCAnOmRpenp5X2ZhY2U6JywgJzpkaXp6eTonLCAnOmRyb3BsZXQ6JywgJzplYXI6Jyxcbic6ZXhjbGFtYXRpb246JywgJzpleHByZXNzaW9ubGVzczonLCAnOmV5ZXM6JywgJzpmYWNlcHVuY2g6JywgJzpmYW1pbHk6Jyxcbic6ZmVhcmZ1bDonLCAnOmZlZWxzZ29vZDonLCAnOmZlZXQ6JywgJzpmaW5uYWRpZTonLCAnOmZpcmU6JywgJzpmaXN0OicsXG4nOmZsdXNoZWQ6JywgJzpmcm93bmluZzonLCAnOmdpcmw6JywgJzpnb2JlcnNlcms6JywgJzpnb2Rtb2RlOicsXG4nOmdyZWVuX2hlYXJ0OicsICc6Z3JleV9leGNsYW1hdGlvbjonLCAnOmdyZXlfcXVlc3Rpb246JywgJzpncmltYWNpbmc6Jyxcbic6Z3JpbjonLCAnOmdyaW5uaW5nOicsICc6Z3VhcmRzbWFuOicsICc6aGFpcmN1dDonLCAnOmhhbmQ6JywgJzpoYW5rZXk6Jyxcbic6aGVhcl9ub19ldmlsOicsICc6aGVhcnRfZXllc19jYXQ6JywgJzpoZWFydF9leWVzOicsICc6aGVhcnQ6Jyxcbic6aGVhcnRiZWF0OicsICc6aGVhcnRwdWxzZTonLCAnOmh1cnRyZWFsYmFkOicsICc6aHVzaGVkOicsICc6aW1wOicsXG4nOmluZm9ybWF0aW9uX2Rlc2tfcGVyc29uOicsICc6aW5ub2NlbnQ6JywgJzpqYXBhbmVzZV9nb2JsaW46Jyxcbic6amFwYW5lc2Vfb2dyZTonLCAnOmpveV9jYXQ6JywgJzpqb3k6JywgJzpraXNzOicsICc6a2lzc2luZ19jYXQ6Jyxcbic6a2lzc2luZ19jbG9zZWRfZXllczonLCAnOmtpc3NpbmdfaGVhcnQ6JywgJzpraXNzaW5nX3NtaWxpbmdfZXllczonLFxuJzpraXNzaW5nOicsICc6bGF1Z2hpbmc6JywgJzpsaXBzOicsICc6bG92ZV9sZXR0ZXI6Jyxcbic6bWFuX3dpdGhfZ3VhX3BpX21hbzonLCAnOm1hbl93aXRoX3R1cmJhbjonLCAnOm1hbjonLCAnOm1hc2s6Jyxcbic6bWFzc2FnZTonLCAnOm1ldGFsOicsICc6bXVzY2xlOicsICc6bXVzaWNhbF9ub3RlOicsICc6bmFpbF9jYXJlOicsXG4nOm5lY2tiZWFyZDonLCAnOm5ldXRyYWxfZmFjZTonLCAnOm5vX2dvb2Q6JywgJzpub19tb3V0aDonLCAnOm5vc2U6Jyxcbic6bm90ZXM6JywgJzpva19oYW5kOicsICc6b2tfd29tYW46JywgJzpvbGRlcl9tYW46JywgJzpvbGRlcl93b21hbjonLFxuJzpvcGVuX2hhbmRzOicsICc6b3Blbl9tb3V0aDonLCAnOnBlbnNpdmU6JywgJzpwZXJzZXZlcmU6Jyxcbic6cGVyc29uX2Zyb3duaW5nOicsICc6cGVyc29uX3dpdGhfYmxvbmRfaGFpcjonLFxuJzpwZXJzb25fd2l0aF9wb3V0aW5nX2ZhY2U6JywgJzpwb2ludF9kb3duOicsICc6cG9pbnRfbGVmdDonLFxuJzpwb2ludF9yaWdodDonLCAnOnBvaW50X3VwXzI6JywgJzpwb2ludF91cDonLCAnOnBvb3A6JywgJzpwb3V0aW5nX2NhdDonLFxuJzpwcmF5OicsICc6cHJpbmNlc3M6JywgJzpwdW5jaDonLCAnOnB1cnBsZV9oZWFydDonLCAnOnF1ZXN0aW9uOicsXG4nOnJhZ2U6JywgJzpyYWdlMTonLCAnOnJhZ2UyOicsICc6cmFnZTM6JywgJzpyYWdlNDonLCAnOnJhaXNlZF9oYW5kOicsXG4nOnJhaXNlZF9oYW5kczonLCAnOnJlbGF4ZWQ6JywgJzpyZWxpZXZlZDonLCAnOnJldm9sdmluZ19oZWFydHM6Jyxcbic6cnVubmVyOicsICc6cnVubmluZzonLCAnOnNhdGlzZmllZDonLCAnOnNjcmVhbV9jYXQ6JywgJzpzY3JlYW06Jyxcbic6c2VlX25vX2V2aWw6JywgJzpzaGl0OicsICc6c2t1bGw6JywgJzpzbGVlcGluZzonLCAnOnNsZWVweTonLFxuJzpzbWlsZV9jYXQ6JywgJzpzbWlsZTonLCAnOnNtaWxleV9jYXQ6JywgJzpzbWlsZXk6JywgJzpzbWlsaW5nX2ltcDonLFxuJzpzbWlya19jYXQ6JywgJzpzbWlyazonLCAnOnNvYjonLCAnOnNwYXJrbGluZ19oZWFydDonLCAnOnNwYXJrbGVzOicsXG4nOnNwZWFrX25vX2V2aWw6JywgJzpzcGVlY2hfYmFsbG9vbjonLCAnOnN0YXI6JywgJzpzdGFyMjonLFxuJzpzdHVja19vdXRfdG9uZ3VlX2Nsb3NlZF9leWVzOicsICc6c3R1Y2tfb3V0X3Rvbmd1ZV93aW5raW5nX2V5ZTonLFxuJzpzdHVja19vdXRfdG9uZ3VlOicsICc6c3VuZ2xhc3NlczonLCAnOnN1c3BlY3Q6JywgJzpzd2VhdF9kcm9wczonLFxuJzpzd2VhdF9zbWlsZTonLCAnOnN3ZWF0OicsICc6dGhvdWdodF9iYWxsb29uOicsICc6LTE6JywgJzp0aHVtYnNkb3duOicsXG4nOnRodW1ic3VwOicsICc6KzE6JywgJzp0aXJlZF9mYWNlOicsICc6dG9uZ3VlOicsICc6dHJpdW1waDonLFxuJzp0cm9sbGZhY2U6JywgJzp0d29faGVhcnRzOicsICc6dHdvX21lbl9ob2xkaW5nX2hhbmRzOicsXG4nOnR3b193b21lbl9ob2xkaW5nX2hhbmRzOicsICc6dW5hbXVzZWQ6JywgJzp2OicsICc6d2Fsa2luZzonLCAnOndhdmU6Jyxcbic6d2Vhcnk6JywgJzp3aW5rMjonLCAnOndpbms6JywgJzp3b21hbjonLCAnOndvcnJpZWQ6JywgJzp5ZWxsb3dfaGVhcnQ6Jyxcbic6eXVtOicsICc6enp6OicsICc6MTA5OicsICc6aG91c2U6JywgJzpob3VzZV93aXRoX2dhcmRlbjonLCAnOnNjaG9vbDonLFxuJzpvZmZpY2U6JywgJzpwb3N0X29mZmljZTonLCAnOmhvc3BpdGFsOicsICc6YmFuazonLFxuJzpjb252ZW5pZW5jZV9zdG9yZTonLCAnOmxvdmVfaG90ZWw6JywgJzpob3RlbDonLCAnOndlZGRpbmc6JywgJzpjaHVyY2g6Jyxcbic6ZGVwYXJ0bWVudF9zdG9yZTonLCAnOmV1cm9wZWFuX3Bvc3Rfb2ZmaWNlOicsICc6Y2l0eV9zdW5yaXNlOicsXG4nOmNpdHlfc3Vuc2V0OicsICc6amFwYW5lc2VfY2FzdGxlOicsICc6ZXVyb3BlYW5fY2FzdGxlOicsICc6dGVudDonLFxuJzpmYWN0b3J5OicsICc6dG9reW9fdG93ZXI6JywgJzpqYXBhbjonLCAnOm1vdW50X2Z1amk6Jyxcbic6c3VucmlzZV9vdmVyX21vdW50YWluczonLCAnOnN1bnJpc2U6JywgJzpzdGFyczonLCAnOnN0YXR1ZV9vZl9saWJlcnR5OicsXG4nOmJyaWRnZV9hdF9uaWdodDonLCAnOmNhcm91c2VsX2hvcnNlOicsICc6cmFpbmJvdzonLCAnOmZlcnJpc193aGVlbDonLFxuJzpmb3VudGFpbjonLCAnOnJvbGxlcl9jb2FzdGVyOicsICc6c2hpcDonLCAnOnNwZWVkYm9hdDonLCAnOmJvYXQ6Jyxcbic6c2FpbGJvYXQ6JywgJzpyb3dib2F0OicsICc6YW5jaG9yOicsICc6cm9ja2V0OicsICc6YWlycGxhbmU6Jyxcbic6aGVsaWNvcHRlcjonLCAnOnN0ZWFtX2xvY29tb3RpdmU6JywgJzp0cmFtOicsICc6bW91bnRhaW5fcmFpbHdheTonLFxuJzpiaWtlOicsICc6YWVyaWFsX3RyYW13YXk6JywgJzpzdXNwZW5zaW9uX3JhaWx3YXk6Jyxcbic6bW91bnRhaW5fY2FibGV3YXk6JywgJzp0cmFjdG9yOicsICc6Ymx1ZV9jYXI6JywgJzpvbmNvbWluZ19hdXRvbW9iaWxlOicsXG4nOmNhcjonLCAnOnJlZF9jYXI6JywgJzp0YXhpOicsICc6b25jb21pbmdfdGF4aTonLCAnOmFydGljdWxhdGVkX2xvcnJ5OicsXG4nOmJ1czonLCAnOm9uY29taW5nX2J1czonLCAnOnJvdGF0aW5nX2xpZ2h0OicsICc6cG9saWNlX2NhcjonLFxuJzpvbmNvbWluZ19wb2xpY2VfY2FyOicsICc6ZmlyZV9lbmdpbmU6JywgJzphbWJ1bGFuY2U6JywgJzptaW5pYnVzOicsXG4nOnRydWNrOicsICc6dHJhaW46JywgJzpzdGF0aW9uOicsICc6dHJhaW4yOicsICc6YnVsbGV0dHJhaW5fZnJvbnQ6Jyxcbic6YnVsbGV0dHJhaW5fc2lkZTonLCAnOmxpZ2h0X3JhaWw6JywgJzptb25vcmFpbDonLCAnOnJhaWx3YXlfY2FyOicsXG4nOnRyb2xsZXlidXM6JywgJzp0aWNrZXQ6JywgJzpmdWVscHVtcDonLCAnOnZlcnRpY2FsX3RyYWZmaWNfbGlnaHQ6Jyxcbic6dHJhZmZpY19saWdodDonLCAnOndhcm5pbmc6JywgJzpjb25zdHJ1Y3Rpb246JywgJzpiZWdpbm5lcjonLCAnOmF0bTonLFxuJzpzbG90X21hY2hpbmU6JywgJzpidXNzdG9wOicsICc6YmFyYmVyOicsICc6aG90c3ByaW5nczonLFxuJzpjaGVja2VyZWRfZmxhZzonLCAnOmNyb3NzZWRfZmxhZ3M6JywgJzppemFrYXlhX2xhbnRlcm46JywgJzptb3lhaTonLFxuJzpjaXJjdXNfdGVudDonLCAnOnBlcmZvcm1pbmdfYXJ0czonLCAnOnJvdW5kX3B1c2hwaW46Jyxcbic6dHJpYW5ndWxhcl9mbGFnX29uX3Bvc3Q6JywgJzpqcDonLCAnOmtyOicsICc6Y246JywgJzp1czonLCAnOmZyOicsXG4nOmVzOicsICc6aXQ6JywgJzpydTonLCAnOmdiOicsICc6dWs6JywgJzpkZTonLCAnOjEwMDonLCAnOjEyMzQ6Jyxcbic6b25lOicsICc6dHdvOicsICc6dGhyZWU6JywgJzpmb3VyOicsICc6Zml2ZTonLCAnOnNpeDonLCAnOnNldmVuOicsXG4nOmVpZ2h0OicsICc6bmluZTonLCAnOmtleWNhcF90ZW46JywgJzp6ZXJvOicsICc6aGFzaDonLCAnOnN5bWJvbHM6Jyxcbic6YXJyb3dfYmFja3dhcmQ6JywgJzphcnJvd19kb3duOicsICc6YXJyb3dfZm9yd2FyZDonLCAnOmFycm93X2xlZnQ6Jyxcbic6Y2FwaXRhbF9hYmNkOicsICc6YWJjZDonLCAnOmFiYzonLCAnOmFycm93X2xvd2VyX2xlZnQ6Jyxcbic6YXJyb3dfbG93ZXJfcmlnaHQ6JywgJzphcnJvd19yaWdodDonLCAnOmFycm93X3VwOicsXG4nOmFycm93X3VwcGVyX2xlZnQ6JywgJzphcnJvd191cHBlcl9yaWdodDonLCAnOmFycm93X2RvdWJsZV9kb3duOicsXG4nOmFycm93X2RvdWJsZV91cDonLCAnOmFycm93X2Rvd25fc21hbGw6JywgJzphcnJvd19oZWFkaW5nX2Rvd246Jyxcbic6YXJyb3dfaGVhZGluZ191cDonLCAnOmxlZnR3YXJkc19hcnJvd193aXRoX2hvb2s6JywgJzphcnJvd19yaWdodF9ob29rOicsXG4nOmxlZnRfcmlnaHRfYXJyb3c6JywgJzphcnJvd191cF9kb3duOicsICc6YXJyb3dfdXBfc21hbGw6Jyxcbic6YXJyb3dzX2Nsb2Nrd2lzZTonLCAnOmFycm93c19jb3VudGVyY2xvY2t3aXNlOicsICc6cmV3aW5kOicsXG4nOmZhc3RfZm9yd2FyZDonLCAnOmluZm9ybWF0aW9uX3NvdXJjZTonLCAnOm9rOicsXG4nOnR3aXN0ZWRfcmlnaHR3YXJkc19hcnJvd3M6JywgJzpyZXBlYXQ6JywgJzpyZXBlYXRfb25lOicsICc6bmV3OicsXG4nOnRvcDonLCAnOnVwOicsICc6Y29vbDonLCAnOmZyZWU6JywgJzpuZzonLCAnOmNpbmVtYTonLCAnOmtva286Jyxcbic6c2lnbmFsX3N0cmVuZ3RoOicsICc6dTUyNzI6JywgJzp1NTQwODonLCAnOnU1NWI2OicsICc6dTYzMDc6Jyxcbic6dTY3MDg6JywgJzp1NjcwOTonLCAnOnU2ZTgwOicsICc6dTcxMjE6JywgJzp1NzUzMzonLCAnOnU3YTdhOicsXG4nOnU3OTgxOicsICc6c2E6JywgJzpyZXN0cm9vbTonLCAnOm1lbnM6JywgJzp3b21lbnM6JywgJzpiYWJ5X3N5bWJvbDonLFxuJzpub19zbW9raW5nOicsICc6cGFya2luZzonLCAnOndoZWVsY2hhaXI6JywgJzptZXRybzonLCAnOmJhZ2dhZ2VfY2xhaW06Jyxcbic6YWNjZXB0OicsICc6d2M6JywgJzpwb3RhYmxlX3dhdGVyOicsICc6cHV0X2xpdHRlcl9pbl9pdHNfcGxhY2U6Jyxcbic6c2VjcmV0OicsICc6Y29uZ3JhdHVsYXRpb25zOicsICc6bTonLCAnOnBhc3Nwb3J0X2NvbnRyb2w6Jyxcbic6bGVmdF9sdWdnYWdlOicsICc6Y3VzdG9tczonLCAnOmlkZW9ncmFwaF9hZHZhbnRhZ2U6JywgJzpjbDonLCAnOnNvczonLFxuJzppZDonLCAnOm5vX2VudHJ5X3NpZ246JywgJzp1bmRlcmFnZTonLCAnOm5vX21vYmlsZV9waG9uZXM6Jyxcbic6ZG9fbm90X2xpdHRlcjonLCAnOm5vbi1wb3RhYmxlX3dhdGVyOicsICc6bm9fYmljeWNsZXM6Jyxcbic6bm9fcGVkZXN0cmlhbnM6JywgJzpjaGlsZHJlbl9jcm9zc2luZzonLCAnOm5vX2VudHJ5OicsXG4nOmVpZ2h0X3Nwb2tlZF9hc3RlcmlzazonLCAnOmVpZ2h0X3BvaW50ZWRfYmxhY2tfc3RhcjonLFxuJzpoZWFydF9kZWNvcmF0aW9uOicsICc6dnM6JywgJzp2aWJyYXRpb25fbW9kZTonLCAnOm1vYmlsZV9waG9uZV9vZmY6Jyxcbic6Y2hhcnQ6JywgJzpjdXJyZW5jeV9leGNoYW5nZTonLCAnOmFyaWVzOicsICc6dGF1cnVzOicsICc6Z2VtaW5pOicsXG4nOmNhbmNlcjonLCAnOmxlbzonLCAnOnZpcmdvOicsICc6bGlicmE6JywgJzpzY29ycGl1czonLCAnOnNhZ2l0dGFyaXVzOicsXG4nOmNhcHJpY29ybjonLCAnOmFxdWFyaXVzOicsICc6cGlzY2VzOicsICc6b3BoaXVjaHVzOicsXG4nOnNpeF9wb2ludGVkX3N0YXI6JywgJzpuZWdhdGl2ZV9zcXVhcmVkX2Nyb3NzX21hcms6JywgJzphOicsICc6YjonLFxuJzphYjonLCAnOm8yOicsICc6ZGlhbW9uZF9zaGFwZV93aXRoX2FfZG90X2luc2lkZTonLCAnOnJlY3ljbGU6JywgJzplbmQ6Jyxcbic6b246JywgJzpzb29uOicsICc6Y2xvY2sxOicsICc6Y2xvY2sxMzA6JywgJzpjbG9jazEwOicsICc6Y2xvY2sxMDMwOicsXG4nOmNsb2NrMTE6JywgJzpjbG9jazExMzA6JywgJzpjbG9jazEyOicsICc6Y2xvY2sxMjMwOicsICc6Y2xvY2syOicsXG4nOmNsb2NrMjMwOicsICc6Y2xvY2szOicsICc6Y2xvY2szMzA6JywgJzpjbG9jazQ6JywgJzpjbG9jazQzMDonLFxuJzpjbG9jazU6JywgJzpjbG9jazUzMDonLCAnOmNsb2NrNjonLCAnOmNsb2NrNjMwOicsICc6Y2xvY2s3OicsXG4nOmNsb2NrNzMwOicsICc6Y2xvY2s4OicsICc6Y2xvY2s4MzA6JywgJzpjbG9jazk6JywgJzpjbG9jazkzMDonLFxuJzpoZWF2eV9kb2xsYXJfc2lnbjonLCAnOmNvcHlyaWdodDonLCAnOnJlZ2lzdGVyZWQ6JywgJzp0bTonLCAnOng6Jyxcbic6aGVhdnlfZXhjbGFtYXRpb25fbWFyazonLCAnOmJhbmdiYW5nOicsICc6aW50ZXJyb2Jhbmc6JywgJzpvOicsXG4nOmhlYXZ5X211bHRpcGxpY2F0aW9uX3g6JywgJzpoZWF2eV9wbHVzX3NpZ246JywgJzpoZWF2eV9taW51c19zaWduOicsXG4nOmhlYXZ5X2RpdmlzaW9uX3NpZ246JywgJzp3aGl0ZV9mbG93ZXI6JywgJzpoZWF2eV9jaGVja19tYXJrOicsXG4nOmJhbGxvdF9ib3hfd2l0aF9jaGVjazonLCAnOnJhZGlvX2J1dHRvbjonLCAnOmxpbms6JywgJzpjdXJseV9sb29wOicsXG4nOndhdnlfZGFzaDonLCAnOnBhcnRfYWx0ZXJuYXRpb25fbWFyazonLCAnOnRyaWRlbnQ6JywgJzpibGFja19zcXVhcmU6Jyxcbic6d2hpdGVfc3F1YXJlOicsICc6d2hpdGVfY2hlY2tfbWFyazonLCAnOmJsYWNrX3NxdWFyZV9idXR0b246Jyxcbic6d2hpdGVfc3F1YXJlX2J1dHRvbjonLCAnOmJsYWNrX2NpcmNsZTonLCAnOndoaXRlX2NpcmNsZTonLFxuJzpyZWRfY2lyY2xlOicsICc6bGFyZ2VfYmx1ZV9jaXJjbGU6JywgJzpsYXJnZV9ibHVlX2RpYW1vbmQ6Jyxcbic6bGFyZ2Vfb3JhbmdlX2RpYW1vbmQ6JywgJzpzbWFsbF9ibHVlX2RpYW1vbmQ6Jyxcbic6c21hbGxfb3JhbmdlX2RpYW1vbmQ6JywgJzpzbWFsbF9yZWRfdHJpYW5nbGU6Jyxcbic6c21hbGxfcmVkX3RyaWFuZ2xlX2Rvd246JywgJzpzaGlwaXQ6J107XG4iLCJsZXQgZW1vamlzID0gcmVxdWlyZSgnLi9lbW9qaS5qcycpO1xuXG4vLyB0aGlzIGlzIGFuIGV4YW1wbGUgb2YgbWlkZGxld2FyZSB1c2VkIGluIG91ciB0ZXN0LmpzXG4vLyBhZGRzIHNvbWUgdGV4dCB0byBtZXNzYWdlIGJlZm9yZSBpdCdzIHNlbnQgYW5kIHdoZW4gaXQncyByZWNlaXZlZFxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyByZWd1bGFyIGV4cHJlc3Npb24gdG8gZmluZCBlbW9qaSBzdHJpbmdzXG4gICAgY29uc3QgdGVzdCA9IC86W2EtejAtOV9cXC1cXCtdKzovZztcblxuICAgIC8vIGNyZWF0ZSBlbXB0eSBjb25maWcgb2JqZWN0IGlmIG5vdCBzdXBwbGllZFxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgIGNvbmZpZy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0IHx8IDE2O1xuXG4gICAgLy8gd2hlcmUgZW1vamkgaW1hZ2VzIGFyZSBob3N0ZWQuIGZpbGVuYW1lIChleDogL3NtaWxlLnBuZykgd2lsbCBiZSBhZGRlZFxuICAgIGNvbmZpZy51cmwgPSBjb25maWcudXJsIHx8ICdodHRwOi8vd3d3LndlYnBhZ2VmeC5jb20vdG9vbHMvZW1vamktY2hlYXQtc2hlZXQvZ3JhcGhpY3MvZW1vamlzJztcblxuICAgIC8vIGZ1bmN0aW9uIHRvIHBhcnNlIHN0cmluZyBmb3IgOnNtaWxlOiBhbmQgb3RoZXIgZW1vamlcbiAgICBjb25zdCBlbW9qaSA9IChzb21lU3RyaW5nLCB1cmwgPSBjb25maWcudXJsLCBoZWlnaHQgPSBjb25maWcuaGVpZ2h0KSA9PiBzb21lU3RyaW5nLnJlcGxhY2UodGVzdCwgKG1hdGNoKSA9PiB7XG5cbiAgICAgICAgLy8gdXNlIHJlZ2V4IHRvIGZpbmQgZW1vamkgYW5kIHJlcGxhY2Ugd2l0aCBodG1sXG4gICAgICAgIGxldCByZXN1bHQgPSBtYXRjaDtcblxuICAgICAgICAvLyBpZiB0ZXh0IHN0cmluZyBpcyBpbiBsaXN0IG9mIGVtb2ppc1xuICAgICAgICBpZiAoZW1vamlzLmluZGV4T2YobWF0Y2gpICE9PSAtMSkge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIDogYmVmb3JlIGFuZCBhZnRlclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBTdHJpbmcobWF0Y2gpLnNsaWNlKDEsIC0xKTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGh0bWwgaW1hZ2UsIHVzaW5nIHVybCBhbmQgaGVpZ2h0IHN1cHBsaWVkIGluXG4gICAgICAgICAgICAvLyBmdW5jdGlvblxuICAgICAgICAgICAgcmVzdWx0ID0gJzxpbWcgY2xhc3M9XCJlbW9qaVwiIHRpdGxlPVwiOicgKyBuYW1lXG4gICAgICAgICAgICAgICAgKyAnOlwiIGFsdD1cIicgKyBuYW1lICsgJ1wiIHNyYz1cIicgKyB1cmwgKyAnLydcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICcucG5nXCInXG4gICAgICAgICAgICAgICAgKyAoaGVpZ2h0ID8gKCcgaGVpZ2h0PVwiJyArIGhlaWdodCArICdcIicpIDogJycpXG4gICAgICAgICAgICAgICAgKyAnIC8+JztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH0pO1xuXG4gICAgbGV0IHBhcnNlRW1vamkgPSBmdW5jdGlvbihwYXlsb2FkLCBuZXh0KSB7XG5cbiAgICAgICAgaWYocGF5bG9hZC5kYXRhLnRleHQpIHtcbiAgICAgICAgICAgIC8vIHBhcnNlIGVtb2ppXG4gICAgICAgICAgICBwYXlsb2FkLmRhdGEudGV4dCA9IGVtb2ppKHBheWxvYWQuZGF0YS50ZXh0LCBjb25maWcudXJsLCBjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnRpbnVlIGFsb25nIG1pZGRsZXdhcmVcbiAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgbWlkZGxld2FyZSB0byBydW4gYWZ0ZXIgYSBtZXNzYWdlIGhhcyBiZWVuIHJlY2VpdmVkIGFuZCBPQ0YgaGFzIHByb2Nlc3NlZCBpdFxuICAgIGxldCBicm9hZGNhc3QgPSB7XG4gICAgICAgICdtZXNzYWdlJzogcGFyc2VFbW9qaSxcbiAgICAgICAgJyRoaXN0b3J5Lm1lc3NhZ2UnOiBwYXJzZUVtb2ppXG4gICAgfTtcblxuICAgIC8vIHRoZXNlIGFyZSBuZXcgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIGV4dGVuZGVkIGNsYXNzXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcbiAgICAgICAgcmVuZGVyKHN0cmluZywgdXJsLCBoZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbW9qaShzdHJpbmcsIHVybCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2gocXVlcnkpIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBpIGluIGVtb2ppcykge1xuICAgICAgICAgICAgICAgIGlmKGVtb2ppc1tpXS5zdWJzdHJpbmcoMCwgcXVlcnkubGVuZ3RoKSA9PSBxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZW1vamlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtaWRkbGV3YXJlIHRlbGxzIHRoZSBmcmFtZXdvcmsgdG8gdXNlIHRoZXNlIGZ1bmN0aW9ucyB3aGVuXG4gICAgLy8gbWVzc2FnZXMgYXJlIHNlbnQgb3IgcmVjZWl2ZWRcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICdlbW9qaScsXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGJyb2FkY2FzdDogYnJvYWRjYXN0XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICAgIEdsb2JhbENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxufVxuIl19
