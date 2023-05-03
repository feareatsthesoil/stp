import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Socials() {
  const router = useRouter()
  const isHomepage = router.pathname === "/"
  let isHome;
  isHomepage ? isHome = "white" : isHome = "black"

  return (
    <ul>
      <li>
        {/* TWITTER */}
        <Link href="https://twitter.com/stp_xyz" target="webapp-tab">
          <svg viewBox="0 0 240 240" width="20.0pt" height="12.0pt">
            <path d="M 181.03 24.81 C 189.09 27.32 196.26 31.97 202.10 38.02 C 213.32 35.70 223.42 31.78 233.36 26.11 C 229.68 37.48 221.99 46.96 211.89 53.27 C 221.72 52.03 230.92 49.50 240.00 45.55 L 240.00 45.59 C 234.37 53.66 227.91 61.05 220.24 67.25 C 218.57 68.53 216.93 69.83 215.37 71.24 C 216.76 101.10 207.82 131.50 191.35 156.37 C 175.51 180.42 152.16 199.31 125.00 209.06 C 91.36 221.14 52.78 220.34 19.97 205.97 C 12.98 203.07 6.54 199.28 0.00 195.52 L 0.00 195.35 C 25.88 198.51 52.30 190.98 72.87 175.04 C 63.68 174.75 54.69 172.09 46.97 167.05 C 37.64 160.75 30.34 151.60 26.90 140.82 C 34.22 142.05 41.68 141.98 48.86 139.95 C 39.60 137.88 31.04 133.41 24.31 126.70 C 14.83 117.36 9.42 104.41 9.63 91.08 C 16.67 94.80 23.90 96.86 31.87 97.21 C 22.36 90.69 15.21 81.13 12.04 70.01 C 8.26 57.15 9.99 43.09 16.72 31.50 C 25.59 42.26 35.92 51.76 47.52 59.50 C 68.41 73.54 93.05 81.65 118.18 82.92 C 116.23 73.90 116.54 64.54 119.60 55.80 C 123.62 44.04 132.20 33.98 143.20 28.19 C 154.68 22.07 168.65 20.86 181.03 24.81 Z" fill={isHome} />
          </svg>
        </Link>
      </li>
      <li>
        {/* OPENSEA */}
        <Link href="https://opensea.io/collection/seeds-luciensmith" target="webapp-tab">
          <svg viewBox="0 0 360 360" width="36.0pt" height="12.0pt" >
            <path d="M 176.03 0.00 L 184.40 0.00 C 212.41 0.78 240.11 7.88 264.80 21.19 C 285.00 31.98 303.07 46.67 317.80 64.20 C 344.15 95.31 359.14 135.28 360.00 176.03 L 360.00 184.40 C 359.20 215.10 350.60 245.45 334.83 271.83 C 318.76 298.95 295.47 321.66 267.97 337.06 C 242.39 351.51 213.31 359.30 183.97 360.00 L 175.60 360.00 C 145.38 359.20 115.50 350.87 89.41 335.57 C 64.72 321.18 43.57 300.86 28.21 276.76 C 10.46 249.17 0.76 216.74 0.00 183.97 L 0.00 175.60 C 0.86 141.73 11.31 108.34 30.19 80.19 C 44.17 59.24 62.56 41.28 83.85 27.82 C 111.31 10.32 143.50 0.75 176.03 0.00 Z M 175.52 94.03 C 166.23 91.59 157.00 88.79 147.64 86.64 C 148.15 89.14 149.35 91.26 150.58 93.46 C 157.74 107.37 163.68 122.25 167.33 137.48 C 169.99 149.39 171.32 163.11 166.87 174.75 C 162.47 186.94 155.11 198.52 147.86 209.21 C 148.90 210.18 149.41 210.86 150.96 210.74 C 159.14 210.79 167.32 210.72 175.50 210.76 C 175.50 217.46 175.50 224.17 175.50 230.87 C 166.68 230.86 157.85 230.91 149.03 230.86 C 140.53 230.75 132.95 224.29 131.45 215.94 C 131.10 213.49 131.21 211.04 130.63 208.62 C 112.39 208.66 94.15 208.54 75.91 208.69 C 73.96 232.09 88.34 255.58 109.41 265.60 C 117.95 269.94 127.42 271.80 136.97 271.76 C 167.66 271.74 198.36 271.75 229.05 271.75 C 234.47 271.76 239.81 270.40 244.35 267.37 C 254.18 261.18 260.84 249.58 266.99 239.97 C 271.01 233.88 274.85 226.10 280.79 221.76 C 285.94 217.65 291.65 215.07 297.51 212.20 C 297.41 207.74 297.70 203.23 297.35 198.78 C 296.59 198.01 295.64 197.87 294.51 198.36 C 276.77 203.58 258.79 208.61 241.09 213.90 C 235.35 218.09 230.90 224.95 224.57 228.61 C 221.66 230.24 218.38 230.95 215.05 230.89 C 208.63 230.88 202.20 230.88 195.77 230.87 C 195.73 224.16 195.76 217.46 195.75 210.75 C 201.27 210.71 206.80 210.84 212.32 210.66 C 220.44 203.22 227.83 195.17 233.91 185.95 C 237.65 180.30 240.69 173.74 241.75 167.01 C 243.10 157.57 239.42 147.39 234.64 139.35 C 226.08 124.86 213.64 112.89 200.71 102.30 C 199.24 101.03 197.56 100.27 195.77 99.56 C 195.69 93.70 195.82 87.83 195.73 81.97 C 195.76 77.07 191.78 72.64 186.94 72.06 C 181.56 71.37 176.04 75.39 175.61 80.90 C 175.33 85.26 175.57 89.66 175.52 94.03 Z M 93.18 179.20 C 91.67 181.73 89.50 184.27 88.59 187.05 L 89.01 188.31 C 100.96 188.76 113.03 188.37 125.00 188.50 C 129.70 188.41 134.46 188.71 139.15 188.34 C 143.18 182.46 146.55 175.83 149.21 169.20 C 151.97 162.29 151.72 155.26 150.70 148.02 C 148.84 136.22 144.77 124.79 140.13 113.83 C 139.27 112.28 139.25 110.80 137.09 110.81 C 135.38 112.90 134.02 115.31 132.56 117.58 C 119.44 138.12 106.28 158.66 93.18 179.20 Z" fill={isHome} />
          </svg>
        </Link>
      </li>
      <li>
        {/* INSTAGRAM */}
        <Link href="https://www.instagram.com/servingthepeople/" target="webapp-tab">
          <svg viewBox="0 0 1025 1023" width="21.0pt" height="12.0pt">
            <path d="M 384.00 1.16 C 413.32 0.49 442.67 0.45 472.00 0.28 C 528.33 0.04 584.67 0.20 641.00 0.85 C 674.37 1.13 707.74 2.36 741.04 4.67 C 752.44 5.50 763.63 6.22 774.95 7.64 C 794.84 10.13 814.42 14.27 833.49 20.44 C 878.50 34.88 919.74 61.48 951.48 96.51 C 977.80 125.63 996.52 160.59 1007.88 198.08 C 1016.37 226.13 1021.03 255.57 1023.15 284.77 C 1024.04 297.04 1024.40 309.36 1025.00 321.65 L 1025.00 703.10 C 1023.88 722.78 1022.62 742.43 1020.69 762.05 C 1017.56 792.06 1010.91 821.51 999.47 849.48 C 981.64 893.33 951.71 932.37 913.94 960.91 C 880.10 986.45 840.87 1002.55 799.51 1011.21 C 764.93 1018.41 730.24 1020.42 695.00 1020.80 C 620.69 1021.63 546.31 1021.80 472.00 1021.93 C 429.99 1022.31 388.00 1021.91 346.00 1021.12 C 298.63 1020.09 249.95 1017.26 204.26 1003.83 C 165.33 992.52 129.00 973.41 98.88 946.13 C 67.30 918.01 43.15 882.11 28.39 842.51 C 17.71 814.20 11.49 784.06 8.39 754.01 C 6.21 733.65 5.51 713.44 4.71 693.00 C 1.21 596.90 3.18 499.28 3.14 403.00 C 3.27 367.93 4.50 333.07 6.01 298.03 C 7.27 263.69 11.93 229.08 22.34 196.25 C 30.91 169.11 43.62 143.23 59.82 119.83 C 83.49 85.55 115.68 57.67 152.80 38.81 C 194.53 17.68 241.32 6.19 288.00 4.46 C 319.99 3.09 351.99 1.86 384.00 1.16 Z M 426.01 929.96 C 456.00 930.28 486.01 929.90 516.00 929.78 C 573.92 928.93 632.08 929.23 690.00 928.03 C 716.84 927.50 743.49 926.65 769.98 921.92 C 786.00 919.01 801.98 915.07 817.18 909.16 C 849.27 896.85 877.33 873.98 896.40 845.43 C 914.13 818.81 923.34 788.71 927.73 757.23 C 931.68 729.62 932.15 701.36 932.91 673.52 C 934.18 639.02 934.37 604.51 933.94 570.00 C 933.73 493.00 933.10 416.00 932.31 339.00 C 932.04 312.94 931.12 286.72 926.86 260.97 C 923.91 243.36 919.86 226.18 913.34 209.52 C 900.58 176.61 877.08 147.65 847.20 128.78 C 821.66 112.59 792.69 103.94 762.95 99.54 C 735.02 95.39 706.21 95.09 678.00 94.03 C 646.33 92.95 614.68 92.64 583.00 92.65 C 491.18 92.65 398.59 91.17 307.00 95.55 C 283.71 96.70 260.68 99.41 238.03 105.10 C 210.09 112.38 183.88 124.97 162.14 144.15 C 138.81 164.68 121.54 192.33 111.81 221.75 C 104.91 242.60 101.50 264.10 99.99 285.97 C 97.64 323.95 96.21 361.96 95.89 400.00 C 95.38 477.39 95.87 554.62 96.19 632.00 C 96.17 656.79 97.27 681.35 97.85 706.04 C 98.64 732.07 100.59 757.69 106.70 783.08 C 113.16 810.86 124.65 837.02 142.83 859.14 C 163.30 884.11 190.74 902.08 221.08 912.76 C 244.36 921.01 268.40 924.76 293.00 926.00 C 337.26 928.50 381.68 929.78 426.01 929.96 Z" fill={isHome} />
            <path d="M 778.48 177.82 C 794.96 175.21 812.28 179.28 825.59 189.39 C 837.43 198.26 845.70 211.54 848.54 226.05 C 851.48 240.55 849.24 255.97 841.99 268.89 C 835.66 280.25 825.68 289.49 813.83 294.87 C 800.28 301.06 784.49 302.07 770.26 297.62 C 756.10 293.25 743.75 283.66 735.84 271.15 C 729.03 260.44 725.62 247.68 726.37 234.99 C 727.04 221.99 731.99 209.35 740.35 199.37 C 749.89 187.83 763.70 180.11 778.48 177.82 Z" fill={isHome} />
            <path d="M 525.95 249.07 C 553.86 249.95 581.63 255.52 607.76 265.35 C 649.43 281.00 686.80 307.49 715.62 341.38 C 740.46 370.52 758.88 405.06 769.04 441.99 C 779.87 481.26 781.36 523.06 773.24 562.99 C 764.70 605.39 745.33 645.40 717.64 678.61 C 689.30 712.76 652.30 739.63 610.99 755.88 C 580.51 767.92 547.77 774.10 515.00 774.11 C 474.91 774.14 434.91 764.81 399.00 746.99 C 357.42 726.47 321.46 694.84 295.75 656.25 C 275.22 625.53 261.27 590.47 255.28 554.00 C 249.11 516.84 251.14 478.38 261.17 442.07 C 272.69 400.15 294.85 361.30 324.90 329.90 C 354.57 298.76 391.84 275.01 432.75 261.66 C 462.77 251.73 494.40 247.82 525.95 249.07 Z M 491.54 342.91 C 459.69 347.26 429.29 360.96 404.85 381.82 C 381.31 401.79 363.36 428.21 353.62 457.51 C 343.69 487.15 342.24 519.48 349.35 549.91 C 355.71 577.37 369.10 603.10 387.86 624.13 C 407.60 646.38 433.23 663.30 461.49 672.61 C 491.89 682.69 525.19 683.83 556.25 676.09 C 586.04 668.71 613.65 653.05 635.34 631.34 C 656.71 610.08 672.25 583.11 679.81 553.92 C 687.11 525.92 687.14 496.08 679.79 468.08 C 671.83 437.55 655.08 409.49 632.13 387.86 C 611.64 368.44 586.29 354.23 559.00 347.00 C 537.09 341.16 513.99 339.80 491.54 342.91 Z" fill={isHome} />
          </svg>
        </Link>
      </li>
      <li>
        {/* DISCORD */}
        <Link href="https://discord.gg/nhqyng5wQ9" target="webapp-tab">
          <svg viewBox="0 0 128 97" width="20.0pt" height="12.0pt">
            <path d="M 81.71 0.00 L 82.78 0.00 L 82.04 0.62 C 89.63 1.87 96.99 4.12 104.14 6.94 C 105.99 7.77 107.75 8.22 108.84 10.09 C 118.03 23.92 124.32 39.52 126.41 56.05 C 127.47 64.33 127.54 72.70 126.73 81.01 C 117.06 88.07 106.34 93.58 94.85 97.00 L 94.14 97.00 C 91.60 93.43 89.34 89.78 87.28 85.91 C 90.99 84.37 94.62 82.68 98.12 80.69 C 97.32 80.11 96.52 79.52 95.72 78.93 C 75.41 88.43 51.75 88.30 31.39 79.00 C 30.59 79.56 29.80 80.12 29.01 80.69 C 32.50 82.70 36.12 84.38 39.85 85.89 C 37.78 89.77 35.54 93.43 32.97 97.00 L 32.11 97.00 C 20.80 93.46 9.97 88.09 0.46 80.99 C 0.28 79.60 0.12 78.21 0.00 76.82 L 0.00 62.84 C 1.32 43.54 8.18 24.26 19.48 8.57 C 27.74 4.63 36.77 2.05 45.76 0.45 C 46.97 2.69 48.09 4.96 49.14 7.28 C 58.93 5.89 68.19 5.90 77.98 7.26 C 79.05 4.87 80.22 2.56 81.55 0.29 L 81.71 0.00 Z M 39.45 41.48 C 31.87 43.87 29.07 53.52 32.82 60.16 C 35.35 64.66 40.71 67.54 45.80 65.63 C 53.54 62.78 56.19 52.21 51.26 45.77 C 48.59 42.10 43.90 40.00 39.45 41.48 Z M 81.47 41.56 C 76.30 43.31 73.20 48.69 73.45 54.02 C 73.39 60.65 79.13 66.99 86.01 66.13 C 93.31 65.04 97.31 57.03 95.61 50.23 C 94.20 44.15 87.71 39.31 81.47 41.56 Z" fill={isHome} />
          </svg>
        </Link>
      </li>
    </ul>
  )
}
