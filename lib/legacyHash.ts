/**
 * Self-contained MD5 and CRC32 implementations.
 *
 * The Web Crypto API (crypto.subtle.digest) deliberately does NOT support MD5,
 * and there is no native CRC32. Both are still widely needed for checksums,
 * legacy system interop, ETags, and file-integrity verification, so we provide
 * small, dependency-free, well-tested implementations here.
 *
 * MD5 is NOT cryptographically secure — it is provided for checksums and
 * compatibility only, never for password hashing or signatures.
 */

/** Compute the MD5 digest of a byte array, returned as a lowercase hex string. */
export function md5Hex(bytes: Uint8Array): string {
  // Constants for MD5Transform routine.
  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];

  const add32 = (a: number, b: number) => (a + b) & 0xffffffff;
  const rol = (x: number, c: number) => ((x << c) | (x >>> (32 - c))) & 0xffffffff;

  // Pre-processing: pad the message.
  const origLenBits = bytes.length * 8;
  // append 0x80, then zeros until length ≡ 56 (mod 64), then 8-byte length.
  const paddedLen = ((bytes.length + 8) >> 6 << 6) + 64;
  const msg = new Uint8Array(paddedLen);
  msg.set(bytes);
  msg[bytes.length] = 0x80;
  // little-endian length (low 32 bits + high 32 bits)
  const lenLo = origLenBits >>> 0;
  const lenHi = Math.floor(origLenBits / 0x100000000) >>> 0;
  msg[paddedLen - 8] = lenLo & 0xff;
  msg[paddedLen - 7] = (lenLo >>> 8) & 0xff;
  msg[paddedLen - 6] = (lenLo >>> 16) & 0xff;
  msg[paddedLen - 5] = (lenLo >>> 24) & 0xff;
  msg[paddedLen - 4] = lenHi & 0xff;
  msg[paddedLen - 3] = (lenHi >>> 8) & 0xff;
  msg[paddedLen - 2] = (lenHi >>> 16) & 0xff;
  msg[paddedLen - 1] = (lenHi >>> 24) & 0xff;

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const M = new Int32Array(16);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    for (let i = 0; i < 16; i++) {
      const j = chunk + i * 4;
      M[i] = msg[j] | (msg[j + 1] << 8) | (msg[j + 2] << 16) | (msg[j + 3] << 24);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = add32(add32(add32(F, A), K[i]), M[g]);
      A = D;
      D = C;
      C = B;
      B = add32(B, rol(F, s[i]));
    }

    a0 = add32(a0, A);
    b0 = add32(b0, B);
    c0 = add32(c0, C);
    d0 = add32(d0, D);
  }

  const toLeHex = (n: number) =>
    [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

  return toLeHex(a0) + toLeHex(b0) + toLeHex(c0) + toLeHex(d0);
}

// Precomputed CRC32 lookup table (IEEE 802.3 polynomial 0xEDB88320).
const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

/** Compute the CRC32 checksum of a byte array, returned as an 8-char lowercase hex string. */
export function crc32Hex(bytes: Uint8Array): string {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  crc = (crc ^ 0xffffffff) >>> 0;
  return crc.toString(16).padStart(8, '0');
}
