import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const Cabane = () => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <View style={styles.svgContainer}>
        <Svg
          viewBox="0 0 45 45"
          width={45}
          height={45}
        >
          <Defs>
            <ClipPath id="clipPath">
              <Rect width="45" height="45" x="0" y="0" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#clipPath)">
            <G transform="matrix(1,0,0,1,0.875,8)" opacity="1">
              <G transform="matrix(1,0,0,1,16,14.5)" opacity="1">
                <Path
                  fill="#222222"
 d=" M11.5,-4.208000183105469 C11.5,-4.208000183105469 11.5,-11.293000221252441 11.5,-11.293000221252441 C11.5,-11.293000221252441 12.5,-11.293000221252441 12.5,-11.293000221252441 C12.5,-11.293000221252441 12.5,-2.2079999446868896 12.5,-2.2079999446868896 C12.5,-2.2079999446868896 12.5,-2.000999927520752 12.5,-2.000999927520752 C12.5,-2.000999927520752 12.645999908447266,-1.8539999723434448 12.645999908447266,-1.8539999723434448 C12.645999908447266,-1.8539999723434448 15,0.49900001287460327 15,0.49900001287460327 C15,0.49900001287460327 14.293000221252441,1.2070000171661377 14.293000221252441,1.2070000171661377 C14.293000221252441,1.2070000171661377 13.352999687194824,0.2669999897480011 13.352999687194824,0.2669999897480011 C13.352999687194824,0.2669999897480011 12.5,-0.5879999995231628 12.5,-0.5879999995231628 C12.5,-0.5879999995231628 12.5,0.6200000047683716 12.5,0.6200000047683716 C12.5,0.6200000047683716 12.5,1.2070000171661377 12.5,1.2070000171661377 C12.5,1.847000002861023 12.260000228881836,2.430000066757202 11.86400032043457,2.872999906539917 C11.86400032043457,2.872999906539917 11.5649995803833,3.2060000896453857 11.5649995803833,3.2060000896453857 C11.5649995803833,3.2060000896453857 11.86299991607666,3.5399999618530273 11.86299991607666,3.5399999618530273 C12.227999687194824,3.947000026702881 12.460000038146973,4.4730000495910645 12.494999885559082,5.052000045776367 C12.494999885559082,5.052000045776367 12.5,5.214000225067139 12.5,5.214000225067139 C12.5,5.214000225067139 12.5,6.206999778747559 12.5,6.206999778747559 C12.5,6.8470001220703125 12.260000228881836,7.429999828338623 11.86400032043457,7.873000144958496 C11.86400032043457,7.873000144958496 11.5649995803833,8.206000328063965 11.5649995803833,8.206000328063965 C11.5649995803833,8.206000328063965 11.86299991607666,8.539999961853027 11.86299991607666,8.539999961853027 C12.227999687194824,8.946999549865723 12.460000038146973,9.472999572753906 12.494999885559082,10.052000045776367 C12.494999885559082,10.052000045776367 12.5,10.21399974822998 12.5,10.21399974822998 C12.5,10.21399974822998 12.5,11.206999778747559 12.5,11.206999778747559 C12.5,12.53600025177002 11.463000297546387,13.623000144958496 10.154000282287598,13.70199966430664 C10.154000282287598,13.70199966430664 9.993000030517578,13.706999778747559 9.993000030517578,13.706999778747559 C9.993000030517578,13.706999778747559 -10,13.706999778747559 -10,13.706999778747559 C-11.329000473022461,13.706999778747559 -12.416000366210938,12.670000076293945 -12.494999885559082,11.361000061035156 C-12.494999885559082,11.361000061035156 -12.5,11.199000358581543 -12.5,11.199000358581543 C-12.5,11.199000358581543 -12.5,10.206999778747559 -12.5,10.206999778747559 C-12.5,9.565999984741211 -12.260000228881836,8.982999801635742 -11.86400032043457,8.539999961853027 C-11.86400032043457,8.539999961853027 -11.5649995803833,8.206999778747559 -11.5649995803833,8.206999778747559 C-11.5649995803833,8.206999778747559 -11.86400032043457,7.873000144958496 -11.86400032043457,7.873000144958496 C-12.227999687194824,7.466000080108643 -12.460000038146973,6.940000057220459 -12.494999885559082,6.361000061035156 C-12.494999885559082,6.361000061035156 -12.5,6.198999881744385 -12.5,6.198999881744385 C-12.5,6.198999881744385 -12.5,5.206999778747559 -12.5,5.206999778747559 C-12.5,4.565999984741211 -12.260000228881836,3.9830000400543213 -11.86400032043457,3.5399999618530273 C-11.86400032043457,3.5399999618530273 -11.5649995803833,3.2070000171661377 -11.5649995803833,3.2070000171661377 C-11.5649995803833,3.2070000171661377 -11.86400032043457,2.872999906539917 -11.86400032043457,2.872999906539917 C-12.218000411987305,2.4769999980926514 -12.447999954223633,1.968000054359436 -12.491999626159668,1.406000018119812 C-12.491999626159668,1.406000018119812 -12.5,1.1970000267028809 -12.5,1.1970000267028809 C-12.5,1.1970000267028809 -12.5,0.6200000047683716 -12.5,0.6200000047683716 C-12.5,0.6200000047683716 -12.5,-0.5870000123977661 -12.5,-0.5870000123977661 C-12.5,-0.5870000123977661 -13.354000091552734,0.2669999897480011 -13.354000091552734,0.2669999897480011 C-13.354000091552734,0.2669999897480011 -14.293000221252441,1.2070000171661377 -14.293000221252441,1.2070000171661377 C-14.293000221252441,1.2070000171661377 -15,0.5 -15,0.5 C-15,0.5 -1.7680000066757202,-12.732999801635742 -1.7680000066757202,-12.732999801635742 C-0.8330000042915344,-13.668000221252441 0.6600000262260437,-13.706999778747559 1.6410000324249268,-12.85099983215332 C1.6410000324249268,-12.85099983215332 1.7730000019073486,-12.72700023651123 1.7730000019073486,-12.72700023651123 C1.7730000019073486,-12.72700023651123 10.645999908447266,-3.8540000915527344 10.645999908447266,-3.8540000915527344 C10.645999908447266,-3.8540000915527344 11.5,-3.000999927520752 11.5,-3.000999927520752 C11.5,-3.000999927520752 11.5,-4.208000183105469 11.5,-4.208000183105469z M-4.5,9.206000328063965 C-4.5,9.206000328063965 -4.5,8.706000328063965 -4.5,8.706000328063965 C-4.5,8.706000328063965 -5,8.706000328063965 -5,8.706000328063965 C-5,8.706000328063965 -10,8.706999778747559 -10,8.706999778747559 C-10.770000457763672,8.706999778747559 -11.402999877929688,9.28600025177002 -11.489999771118164,10.031999588012695 C-11.489999771118164,10.031999588012695 -11.491999626159668,10.04699993133545 -11.491999626159668,10.04699993133545 C-11.491999626159668,10.04699993133545 -11.493000030517578,10.060999870300293 -11.493000030517578,10.060999870300293 C-11.493000030517578,10.060999870300293 -11.49899959564209,10.178000450134277 -11.49899959564209,10.178000450134277 C-11.49899959564209,10.178000450134277 -11.5,10.192000389099121 -11.5,10.192000389099121 C-11.5,10.192000389099121 -11.5,10.206999778747559 -11.5,10.206999778747559 C-11.5,10.206999778747559 -11.5,11.206999778747559 -11.5,11.206999778747559 C-11.5,11.97599983215332 -10.920999526977539,12.609999656677246 -10.173999786376953,12.696999549865723 C-10.173999786376953,12.696999549865723 -10.15999984741211,12.697999954223633 -10.15999984741211,12.697999954223633 C-10.15999984741211,12.697999954223633 -10.145999908447266,12.699000358581543 -10.145999908447266,12.699000358581543 C-10.145999908447266,12.699000358581543 -10.029000282287598,12.706000328063965 -10.029000282287598,12.706000328063965 C-10.029000282287598,12.706000328063965 -10.015000343322754,12.706999778747559 -10.015000343322754,12.706999778747559 C-10.015000343322754,12.706999778747559 -10,12.706999778747559 -10,12.706999778747559 C-10,12.706999778747559 -5,12.706999778747559 -5,12.706999778747559 C-5,12.706999778747559 -4.5,12.706999778747559 -4.5,12.706999778747559 C-4.5,12.706999778747559 -4.5,12.206999778747559 -4.5,12.206999778747559 C-4.5,12.206999778747559 -4.5,9.206000328063965 -4.5,9.206000328063965z M3.5,3.2070000171661377 C3.5,3.2070000171661377 3.5,2.7070000171661377 3.5,2.7070000171661377 C3.5,2.7070000171661377 3,2.7070000171661377 3,2.7070000171661377 C3,2.7070000171661377 -3,2.7070000171661377 -3,2.7070000171661377 C-3,2.7070000171661377 -3.5,2.7070000171661377 -3.5,2.7070000171661377 C-3.5,2.7070000171661377 -3.5,3.2070000171661377 -3.5,3.2070000171661377 C-3.5,3.2070000171661377 -3.5,12.206999778747559 -3.5,12.206999778747559 C-3.5,12.206999778747559 -3.5,12.706999778747559 -3.5,12.706999778747559 C-3.5,12.706999778747559 -3,12.706999778747559 -3,12.706999778747559 C-3,12.706999778747559 3,12.706999778747559 3,12.706999778747559 C3,12.706999778747559 3.5,12.706999778747559 3.5,12.706999778747559 C3.5,12.706999778747559 3.5,12.206999778747559 3.5,12.206999778747559 C3.5,12.206999778747559 3.5,3.2070000171661377 3.5,3.2070000171661377z M10.029000282287598,8.706999778747559 C10.029000282287598,8.706999778747559 10.013999938964844,8.706999778747559 10.013999938964844,8.706999778747559 C10.013999938964844,8.706999778747559 10,8.706999778747559 10,8.706999778747559 C10,8.706999778747559 5,8.706000328063965 5,8.706000328063965 C5,8.706000328063965 4.5,8.706000328063965 4.5,8.706000328063965 C4.5,8.706000328063965 4.5,9.206000328063965 4.5,9.206000328063965 C4.5,9.206000328063965 4.5,12.206999778747559 4.5,12.206999778747559 C4.5,12.206999778747559 4.5,12.706999778747559 4.5,12.706999778747559 C4.5,12.706999778747559 5,12.706999778747559 5,12.706999778747559 C5,12.706999778747559 10,12.706999778747559 10,12.706999778747559 C10.769000053405762,12.706999778747559 11.402999877929688,12.126999855041504 11.489999771118164,11.380999565124512 C11.489999771118164,11.380999565124512 11.491000175476074,11.366999626159668 11.491000175476074,11.366999626159668 C11.491000175476074,11.366999626159668 11.491999626159668,11.35200023651123 11.491999626159668,11.35200023651123 C11.491999626159668,11.35200023651123 11.49899959564209,11.234999656677246 11.49899959564209,11.234999656677246 C11.49899959564209,11.234999656677246 11.5,11.220999717712402 11.5,11.220999717712402 C11.5,11.220999717712402 11.5,11.206999778747559 11.5,11.206999778747559 C11.5,11.206999778747559 11.5,10.206999778747559 11.5,10.206999778747559 C11.5,9.437000274658203 10.920999526977539,8.803000450134277 10.173999786376953,8.717000007629395 C10.173999786376953,8.717000007629395 10.15999984741211,8.71500015258789 10.15999984741211,8.71500015258789 C10.15999984741211,8.71500015258789 10.145000457763672,8.71399974822998 10.145000457763672,8.71399974822998 C10.145000457763672,8.71399974822998 10.029000282287598,8.706999778747559 10.029000282287598,8.706999778747559z M10.029000282287598,3.7070000171661377 C10.029000282287598,3.7070000171661377 10.013999938964844,3.7070000171661377 10.013999938964844,3.7070000171661377 C10.013999938964844,3.7070000171661377 10,3.7070000171661377 10,3.7070000171661377 C10,3.7070000171661377 5,3.7060000896453857 5,3.7060000896453857 C5,3.7060000896453857 4.5,3.7060000896453857 4.5,3.7060000896453857 C4.5,3.7060000896453857 4.5,4.205999851226807 4.5,4.205999851226807 C4.5,4.205999851226807 4.5,7.205999851226807 4.5,7.205999851226807 C4.5,7.205999851226807 4.5,7.705999851226807 4.5,7.705999851226807 C4.5,7.705999851226807 5,7.705999851226807 5,7.705999851226807 C5,7.705999851226807 10,7.706999778747559 10,7.706999778747559 C10.769000053405762,7.706999778747559 11.402999877929688,7.126999855041504 11.489999771118164,6.38100004196167 C11.489999771118164,6.38100004196167 11.491000175476074,6.367000102996826 11.491000175476074,6.367000102996826 C11.491000175476074,6.367000102996826 11.491999626159668,6.3520002365112305 11.491999626159668,6.3520002365112305 C11.491999626159668,6.3520002365112305 11.49899959564209,6.235000133514404 11.49899959564209,6.235000133514404 C11.49899959564209,6.235000133514404 11.5,6.2210001945495605 11.5,6.2210001945495605 C11.5,6.2210001945495605 11.5,6.206999778747559 11.5,6.206999778747559 C11.5,6.206999778747559 11.5,5.206999778747559 11.5,5.206999778747559 C11.5,4.436999797821045 10.920999526977539,3.802999973297119 10.173999786376953,3.7170000076293945 C10.173999786376953,3.7170000076293945 10.15999984741211,3.7149999141693115 10.15999984741211,3.7149999141693115 C10.15999984741211,3.7149999141693115 10.145000457763672,3.7139999866485596 10.145000457763672,3.7139999866485596 C10.145000457763672,3.7139999866485596 10.029000282287598,3.7070000171661377 10.029000282287598,3.7070000171661377z M-4.5,4.205999851226807 C-4.5,4.205999851226807 -4.5,3.7060000896453857 -4.5,3.7060000896453857 C-4.5,3.7060000896453857 -5,3.7060000896453857 -5,3.7060000896453857 C-5,3.7060000896453857 -10,3.7070000171661377 -10,3.7070000171661377 C-10.770000457763672,3.7070000171661377 -11.402999877929688,4.285999774932861 -11.489999771118164,5.0320000648498535 C-11.489999771118164,5.0320000648498535 -11.491999626159668,5.046999931335449 -11.491999626159668,5.046999931335449 C-11.491999626159668,5.046999931335449 -11.493000030517578,5.060999870300293 -11.493000030517578,5.060999870300293 C-11.493000030517578,5.060999870300293 -11.49899959564209,5.177999973297119 -11.49899959564209,5.177999973297119 C-11.49899959564209,5.177999973297119 -11.5,5.191999912261963 -11.5,5.191999912261963 C-11.5,5.191999912261963 -11.5,5.206999778747559 -11.5,5.206999778747559 C-11.5,5.206999778747559 -11.5,6.206999778747559 -11.5,6.206999778747559 C-11.5,6.97599983215332 -10.920999526977539,7.610000133514404 -10.173999786376953,7.697000026702881 C-10.173999786376953,7.697000026702881 -10.15999984741211,7.697999954223633 -10.15999984741211,7.697999954223633 C-10.15999984741211,7.697999954223633 -10.145999908447266,7.698999881744385 -10.145999908447266,7.698999881744385 C-10.145999908447266,7.698999881744385 -10.029000282287598,7.705999851226807 -10.029000282287598,7.705999851226807 C-10.029000282287598,7.705999851226807 -10.015000343322754,7.706999778747559 -10.015000343322754,7.706999778747559 C-10.015000343322754,7.706999778747559 -10,7.706999778747559 -10,7.706999778747559 C-10,7.706999778747559 -5,7.705999851226807 -5,7.705999851226807 C-5,7.705999851226807 -4.5,7.705999851226807 -4.5,7.705999851226807 C-4.5,7.705999851226807 -4.5,7.205999851226807 -4.5,7.205999851226807 C-4.5,7.205999851226807 -4.5,4.205999851226807 -4.5,4.205999851226807z M-11.489999771118164,0.03200000151991844 C-11.489999771118164,0.03200000151991844 -11.491999626159668,0.04699999839067459 -11.491999626159668,0.04699999839067459 C-11.491999626159668,0.04699999839067459 -11.493000030517578,0.061000000685453415 -11.493000030517578,0.061000000685453415 C-11.493000030517578,0.061000000685453415 -11.49899959564209,0.17800000309944153 -11.49899959564209,0.17800000309944153 C-11.49899959564209,0.17800000309944153 -11.5,0.19200000166893005 -11.5,0.19200000166893005 C-11.5,0.19200000166893005 -11.5,0.2070000022649765 -11.5,0.2070000022649765 C-11.5,0.2070000022649765 -11.5,1.2070000171661377 -11.5,1.2070000171661377 C-11.5,1.9759999513626099 -10.920999526977539,2.609999895095825 -10.173999786376953,2.697000026702881 C-10.173999786376953,2.697000026702881 -10.15999984741211,2.697999954223633 -10.15999984741211,2.697999954223633 C-10.15999984741211,2.697999954223633 -10.145999908447266,2.6989998817443848 -10.145999908447266,2.6989998817443848 C-10.145999908447266,2.6989998817443848 -10.029000282287598,2.7060000896453857 -10.029000282287598,2.7060000896453857 C-10.029000282287598,2.7060000896453857 -10.015000343322754,2.7070000171661377 -10.015000343322754,2.7070000171661377 C-10.015000343322754,2.7070000171661377 -10,2.7070000171661377 -10,2.7070000171661377 C-10,2.7070000171661377 -4.73199987411499,2.7060000896453857 -4.73199987411499,2.7060000896453857 C-4.73199987411499,2.7060000896453857 -4.443999767303467,2.7060000896453857 -4.443999767303467,2.7060000896453857 C-4.443999767303467,2.7060000896453857 -4.300000190734863,2.4560000896453857 -4.300000190734863,2.4560000896453857 C-4.058000087738037,2.0399999618530273 -3.624000072479248,1.7510000467300415 -3.121000051498413,1.7109999656677246 C-3.121000051498413,1.7109999656677246 -2.990999937057495,1.7070000171661377 -2.990999937057495,1.7070000171661377 C-2.990999937057495,1.7070000171661377 3,1.7070000171661377 3,1.7070000171661377 C3.553999900817871,1.7070000171661377 4.039000034332275,2.006999969482422 4.298999786376953,2.4570000171661377 C4.298999786376953,2.4570000171661377 4.443999767303467,2.7060000896453857 4.443999767303467,2.7060000896453857 C4.443999767303467,2.7060000896453857 4.73199987411499,2.7060000896453857 4.73199987411499,2.7060000896453857 C4.73199987411499,2.7060000896453857 10,2.7070000171661377 10,2.7070000171661377 C10.769000053405762,2.7070000171661377 11.402999877929688,2.127000093460083 11.489999771118164,1.38100004196167 C11.489999771118164,1.38100004196167 11.491000175476074,1.3669999837875366 11.491000175476074,1.3669999837875366 C11.491000175476074,1.3669999837875366 11.491999626159668,1.3519999980926514 11.491999626159668,1.3519999980926514 C11.491999626159668,1.3519999980926514 11.49899959564209,1.2350000143051147 11.49899959564209,1.2350000143051147 C11.49899959564209,1.2350000143051147 11.5,1.2209999561309814 11.5,1.2209999561309814 C11.5,1.2209999561309814 11.5,1.2070000171661377 11.5,1.2070000171661377 C11.5,1.2070000171661377 11.5,0.2070000022649765 11.5,0.2070000022649765 C11.5,-0.621999979019165 10.82800006866455,-1.2929999828338623 10,-1.2929999828338623 C10,-1.2929999828338623 -10,-1.2929999828338623 -10,-1.2929999828338623 C-10.770000457763672,-1.2929999828338623 -11.402999877929688,-0.7139999866485596 -11.489999771118164,0.03200000151991844z M6.939000129699707,-6.1479997634887695 C6.939000129699707,-6.1479997634887695 6.793000221252441,-6.294000148773193 6.793000221252441,-6.294000148773193 C6.793000221252441,-6.294000148773193 6.585999965667725,-6.294000148773193 6.585999965667725,-6.294000148773193 C6.585999965667725,-6.294000148773193 -6.585999965667725,-6.294000148773193 -6.585999965667725,-6.294000148773193 C-6.585999965667725,-6.294000148773193 -6.793000221252441,-6.294000148773193 -6.793000221252441,-6.294000148773193 C-6.793000221252441,-6.294000148773193 -6.940000057220459,-6.1479997634887695 -6.940000057220459,-6.1479997634887695 C-6.940000057220459,-6.1479997634887695 -9.9399995803833,-3.1480000019073486 -9.9399995803833,-3.1480000019073486 C-9.9399995803833,-3.1480000019073486 -10.793000221252441,-2.2939999103546143 -10.793000221252441,-2.2939999103546143 C-10.793000221252441,-2.2939999103546143 -9.586000442504883,-2.2939999103546143 -9.586000442504883,-2.2939999103546143 C-9.586000442504883,-2.2939999103546143 9.586000442504883,-2.2939999103546143 9.586000442504883,-2.2939999103546143 C9.586000442504883,-2.2939999103546143 10.793000221252441,-2.2939999103546143 10.793000221252441,-2.2939999103546143 C10.793000221252441,-2.2939999103546143 9.939000129699707,-3.1480000019073486 9.939000129699707,-3.1480000019073486 C9.939000129699707,-3.1480000019073486 6.939000129699707,-6.1479997634887695 6.939000129699707,-6.1479997634887695z M-0.9200000166893005,-12.149999618530273 C-0.9200000166893005,-12.149999618530273 -0.9319999814033508,-12.140000343322754 -0.9319999814033508,-12.140000343322754 C-0.9319999814033508,-12.140000343322754 -0.9440000057220459,-12.130000114440918 -0.9440000057220459,-12.130000114440918 C-0.9440000057220459,-12.130000114440918 -1.0379999876022339,-12.04699993133545 -1.0379999876022339,-12.04699993133545 C-1.0379999876022339,-12.04699993133545 -1.0499999523162842,-12.036999702453613 -1.0499999523162842,-12.036999702453613 C-1.0499999523162842,-12.036999702453613 -1.0609999895095825,-12.026000022888184 -1.0609999895095825,-12.026000022888184 C-1.0609999895095825,-12.026000022888184 -4.940000057220459,-8.14799976348877 -4.940000057220459,-8.14799976348877 C-4.940000057220459,-8.14799976348877 -5.794000148773193,-7.294000148773193 -5.794000148773193,-7.294000148773193 C-5.794000148773193,-7.294000148773193 -4.585999965667725,-7.294000148773193 -4.585999965667725,-7.294000148773193 C-4.585999965667725,-7.294000148773193 4.585999965667725,-7.294000148773193 4.585999965667725,-7.294000148773193 C4.585999965667725,-7.294000148773193 5.793000221252441,-7.294000148773193 5.793000221252441,-7.294000148773193 C5.793000221252441,-7.294000148773193 4.939000129699707,-8.14799976348877 4.939000129699707,-8.14799976348877 C4.939000129699707,-8.14799976348877 1.059999942779541,-12.026000022888184 1.059999942779541,-12.026000022888184 C0.5189999938011169,-12.567000389099121 -0.3310000002384186,-12.607999801635742 -0.9200000166893005,-12.149999618530273z"/>
            </G>
            </G>
          </G>
        </Svg>
        <Text style={styles.title}>Cabane</Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {

    width: "48%",

    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
  svgContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
});

export default Cabane;
